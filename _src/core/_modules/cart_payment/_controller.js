import React, {useEffect, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import {customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {navigateTo} from '@app/helpers/Navigation';
import {useCartId} from '@app/hooks/useCartId';
import {useRefetchCart} from '@app/hooks/useRefetchCart';
import {useStoreConfig} from '@app/hooks/useStoreConfig';
import crashlytics from '@react-native-firebase/crashlytics';
import {COUPONS, REMOVE, USER_GUEST} from '@app/helpers/Constants';
import {
  rxCartPayment,
  rxCartAppliedCoupon,
  rxCartGiftCard,
  rxCartAppliedStoreCredit,
  rxCartAvailablePaymentMethod,
  rxCartId,
  rxCartIsVirtual,
  rxCartItems,
  rxCartPrices,
  rxUserStoreCredit,
  rxCartExtraFee,
  rxCartPaymentMethod,
  rxCartShippingAddress,
  rxCartShippingMethod,
  rxAppSnackbar,
  rxUserType,
  rxUserInformation,
} from '@app/services/cache';

import {
  APPLIED_COUPONS,
  APPLIED_STORE_CREDIT,
  APPLY_GIFT_CARD,
  APPLY_REWARD_POINTS,
  GET_APPLIED_REWARD_POINTS,
  GET_CART as GET_CART_REMOTE,
  GET_CUSTOMER_REWARD_POINTS,
  GET_SNAP_STATUS,
  GET_SNAP_TOKEN,
  PLACE_ORDER,
  REMOVED_COUPONS,
  REMOVED_REWARD_POINTS,
  REMOVED_STORE_CREDIT,
  REMOVE_GIFT_CARD,
  SET_PAYMENT_METHOD,
  UPDATE_EXTRA_FEE,
} from '@app/_modules/cart/services/schema';
import AnalyticsHelper from '@app/helpers/Analytics';
import Views from '@app/_modules/cart_payment/_view';
import {modules} from '@root/swift.config';
import {PAYMENT_METHOD} from '@app/helpers/Constants';

const Payment = () => {
  if (!modules.cart_payment.enable) {
    return null;
  }

  /**
   * ----------------------------------------- *
   * @const {reactive variable}
   * @summary reactive variable collection
   * ----------------------------------------- *
   */
  const cartId = useReactiveVar(rxCartId);
  const dataPrices = useReactiveVar(rxCartPrices);
  const selectedShippingMethod = useReactiveVar(rxCartShippingMethod);
  const selectedPaymentMethod = useReactiveVar(rxCartPaymentMethod);
  const dataAppliedStoreCredit = useReactiveVar(rxCartAppliedStoreCredit);
  const dataAppliedCoupons = useReactiveVar(rxCartAppliedCoupon);
  const appliedGiftCard = useReactiveVar(rxCartGiftCard);
  const dataExtraFee = useReactiveVar(rxCartExtraFee);
  const storeCredit = useReactiveVar(rxUserStoreCredit);
  const availablePaymentMethodsData = useReactiveVar(
    rxCartAvailablePaymentMethod,
  );
  const activeSections = useReactiveVar(rxCartPayment);
  const userType = useReactiveVar(rxUserType);
  const userData = useReactiveVar(rxUserInformation);

  /**
   * ----------------------------------------- *
   * @const {local variable}
   * @summary local variable collection
   * ----------------------------------------- *
   */
  const {refetch: refetchCart} = useRefetchCart();
  const {getEmptyCart: resetCart} = useCartId();
  const [coreConfig] = useStoreConfig();
  const {data: cartDataRemote} = useQuery(GET_CART_REMOTE, {
    variables: {cartId},
  });
  const {data: customerRewardPointsData} = useQuery(GET_CUSTOMER_REWARD_POINTS);
  const {data: appliedRewardPointsData} = useQuery(GET_APPLIED_REWARD_POINTS, {
    variables: {cartId},
  });
  const cartData = useMemo(() => {
    return cartDataRemote?.cart;
  }, [cartDataRemote]);

  /**
   * ----------------------------------------- *
   * @block {payment}
   * @summary block for handling payment
   * ----------------------------------------- *
   */
  const [selectPaymentMethodHook] = useMutation(SET_PAYMENT_METHOD);
  const [paymentMethodLoading, setPaymentMethodLoading] = useState(false);
  const updateSections = activeSection => {
    rxCartPayment(activeSection);
  };
  const getTitleGroupingPayment = keyTitle => {
    switch (keyTitle) {
      case 'pg-banktransfer':
        return {
          title: 'Bank Transfer',
          icon: 'money',
        };
      case 'pg-installment':
        return {
          title: 'Installment',
          icon: 'clock-o',
        };
      case 'pg-creditcard':
        return {
          title: 'Credit Card',
          icon: 'credit-card',
        };
      case 'pg-internetpayment':
        return {
          title: 'Internet Payment',
          icon: 'mobile-phone',
        };
      default:
        return {
          title: 'Other',
          icon: 'list',
        };
    }
  };
  const groupingPayment = (available, configs) => {
    const resultGroupingPayment = [];
    if (available?.length > 0) {
      Object.keys(configs).map((key, index) => {
        const paymentConfigs = configs[key].toLowerCase().split(',');
        const filteredPayment = available.filter(item => {
          return paymentConfigs.includes(item.code.toLocaleLowerCase());
        });
        if (selectedPaymentMethod) {
          if (
            filteredPayment.filter(
              item => item.code === selectedPaymentMethod.code,
            ).length > 0
          ) {
            if (activeSections.length === 0) {
              updateSections([index]);
            }
          }
        }
        const singlePaymentConfig = getTitleGroupingPayment(key);
        resultGroupingPayment.push({
          title: singlePaymentConfig.title,
          icon: singlePaymentConfig.icon,
          value: filteredPayment,
        });
      });
    }
    // setIsGrouping(true);
    return resultGroupingPayment;
  };
  const paymentConfig = coreConfig
    ? JSON.parse(coreConfig.payments_configuration)
    : null;
  const availablePaymentMethods =
    availablePaymentMethodsData && paymentConfig
      ? groupingPayment(availablePaymentMethodsData, paymentConfig)
      : [];

  const onSelectPaymentMethod = async method => {
    try {
      setPaymentMethodLoading(true);
      const res = await selectPaymentMethodHook({
        variables: {
          input: {
            cart_id: cartId,
            payment_method: {
              code: method.code,
            },
          },
        },
      });

      if (res) {
        crashlytics().setAttribute(PAYMENT_METHOD, method.code.toString());
        refetchCart(res.data.setPaymentMethodOnCart);
        setPaymentMethodLoading(false);
      }
    } catch (error) {
      if (error.graphQLErrors[0]) {
        const {message} = error.graphQLErrors[0];
        rxAppSnackbar({message});
      }
      refetchCart();
      setPaymentMethodLoading(false);
    }
  };
  /**
   * end of @block {payment}
   */

  /**
   * ----------------------------------------- *
   * @block {extraFee}
   * @summary block for handling extra fee
   * ----------------------------------------- *
   */
  const [selectExtraFee] = useMutation(UPDATE_EXTRA_FEE);
  const [extraFeeLoading, setExtraFeeLoading] = useState(true);
  const dataFee = useMemo(() => {
    if (cartDataRemote?.cart?.addtional_fees?.data?.length > 0) {
      setExtraFeeLoading(false);
      return cartData?.addtional_fees.data;
    }
    setExtraFeeLoading(false);
    return [];
  }, [cartDataRemote?.cart?.addtional_fees?.data]);
  const selectedOptionExtraFee = useMemo(() => {
    let result = [];
    if (dataExtraFee) {
      // dataExtraFee?.extraFee?.select_options.map((option) => {
      dataExtraFee?.select_options.map(option => {
        result.push(option.option_id);
      });
      return result;
    }
    return result;
  }, [dataExtraFee]);
  const generateParamUpdate = data => {
    let result = [];
    data.map(option_id => {
      result.push({
        option_id,
      });
    });
    return result;
  };
  const filterSelected = (option_id, type) => {
    let finalSelectedOptionsExtraFee = [];
    if (type === 'radio' || type === 'dropdown') {
      if (!selectedOptionExtraFee.includes(option_id)) {
        const filteredOptionType = cartData?.addtional_fees.data.filter(
          ({frontend_type}) => frontend_type === type,
        );
        let optionItem = [];
        for (let options of filteredOptionType) {
          let found = false;
          for (let option of options.options) {
            if (option.option_id === option_id) {
              found = true;
              break;
            }
          }
          if (found) {
            optionItem = options.options;
            break;
          }
        }
        const selected = optionItem.filter(({option_id: id}) =>
          selectedOptionExtraFee.includes(id),
        );
        if (selected.length > 0) {
          finalSelectedOptionsExtraFee = selectedOptionExtraFee.filter(
            id => id !== selected[0].option_id,
          );
          if (selected.option_id !== option_id) {
            finalSelectedOptionsExtraFee = [
              ...finalSelectedOptionsExtraFee,
              option_id,
            ];
          }
        } else {
          finalSelectedOptionsExtraFee = [...selectedOptionExtraFee, option_id];
        }
      }
    } else {
      if (selectedOptionExtraFee.includes(option_id)) {
        finalSelectedOptionsExtraFee = selectedOptionExtraFee.filter(
          id => id !== option_id,
        );
      } else {
        finalSelectedOptionsExtraFee = [...selectedOptionExtraFee, option_id];
      }
    }
    return finalSelectedOptionsExtraFee;
  };
  const onSelectExtraFee = async (option_id, type) => {
    setExtraFeeLoading(true);
    if (
      (type === 'radio' || type === 'dropdown') &&
      selectedOptionExtraFee.includes(option_id)
    ) {
      setExtraFeeLoading(false);
    } else {
      const res = await selectExtraFee({
        variables: {
          input: {
            cart_id: cartId,
            select_options: generateParamUpdate(
              filterSelected(option_id, type),
            ),
          },
        },
      });

      if (res) {
        refetchCart(res.data.updateExtraFeeOnCart);
        setExtraFeeLoading(false);
      }
    }
  };
  /**
   * end of @block {extraFee}
   */

  /**
   * ----------------------------------------- *
   * @block {coupons}
   * @summary block for handling coupons
   * ----------------------------------------- *
   */
  const [appliedCoupons] = useMutation(APPLIED_COUPONS);
  const [removedCoupons] = useMutation(REMOVED_COUPONS);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const onCouponButtonPress = async (code, isApplied) => {
    setCouponsLoading(true);
    if (isApplied) {
      const resApplied = await appliedCoupons({
        variables: {
          input: {
            cart_id: cartId,
            coupon_code: code,
          },
        },
      });
      refetchCart(resApplied.data.applyCouponToCart);
      crashlytics().setAttribute(COUPONS, code.toString());
      onLogCouponsToAnalytics(code.toString());
      setCouponsLoading(false);
    } else {
      const resRemoved = await removedCoupons({
        variables: {
          input: {
            cart_id: cartId,
          },
        },
      });
      rxCartAppliedCoupon(null);
      refetchCart(resRemoved.data.removeCouponFromCart);
      crashlytics().setAttribute(COUPONS, `${REMOVE}-${code.toString()}`);
      onLogCouponsToAnalytics(`${REMOVE}-${code.toString()}`);
      setCouponsLoading(false);
    }
  };

  /**
   * ----------------------------------------- *
   * @function onLogCouponsToAnalytics
   * @summary log apple/remove coupon to analytics
   * @profiler {googleAnalytics} coupons
   * ----------------------------------------- *
   */
  const onLogCouponsToAnalytics = code => {
    AnalyticsHelper.eventUseCuopon({
      cart_id: cartId,
      code,
      user_type: userType,
      email: userType === USER_GUEST ? '' : userData.email,
    });
  };
  /**
   * end of @block {coupons}
   */

  /**
   * ----------------------------------------- *
   * @block {giftCard}
   * @summary block for handling gift card
   * ----------------------------------------- *
   */
  const [applyGiftCard] = useMutation(APPLY_GIFT_CARD);
  const [removeGiftCard] = useMutation(REMOVE_GIFT_CARD);
  const [giftCardLoading, setGiftCardLoading] = useState(false);
  const onGiftCardButtonPress = async (code, apply) => {
    setGiftCardLoading(true);
    if (apply) {
      try {
        const resApplied = await applyGiftCard({
          variables: {
            input: {
              cart_id: cartId,
              giftcard_code: code,
            },
          },
        });
        refetchCart(resApplied.data.applyGiftCardToCart);
        setGiftCardLoading(false);
      } catch (error) {
        setGiftCardLoading(false);
        let message = 'Sorry, something went wrong.';
        if (error.graphQLErrors[0]) {
          message = error.graphQLErrors[0].message;
        }
        Alert.alert(
          'Error',
          message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    } else {
      const resRemoved = await removeGiftCard({
        variables: {
          input: {
            cart_id: cartId,
            giftcard_code: code,
          },
        },
      });
      rxCartGiftCard(null);
      refetchCart(resRemoved.data.removeGiftCardFromCart);
      setGiftCardLoading(false);
    }
  };
  /**
   * end of @block {giftCard}
   */

  /**
   * ----------------------------------------- *
   * @block {storeCredit}
   * @summary block for handling store credit
   * ----------------------------------------- *
   */
  const [appliedStoreCredit] = useMutation(APPLIED_STORE_CREDIT);
  const [removedStoreappliedStoreCredit] = useMutation(REMOVED_STORE_CREDIT);
  const [storeCreditLoading, setStoreCreditLoading] = useState(false);
  const onStoreCreditButtonPress = async isApplied => {
    if (isApplied) {
      const resApplied = await appliedStoreCredit({
        variables: {
          input: {
            cart_id: cartId,
          },
        },
      });
      // AnalyticsHelper.eventUseStoreCredit(resApplied.data);
      refetchCart(resApplied.data.applyStoreCreditToCart);
      setStoreCreditLoading(false);
    } else {
      const resRemoved = await removedStoreappliedStoreCredit({
        variables: {
          input: {
            cart_id: cartId,
          },
        },
      });
      refetchCart(resRemoved.data.removeStoreCreditFromCart);
      setStoreCreditLoading(false);
    }
  };
  /**
   * end of @block {storeCredit}
   */

  /**
   * ----------------------------------------- *
   * @block {rewardPoint}
   * @summary block for handling reward point
   * ----------------------------------------- *
   */
  const [aplliedRewardPoints, setAppliedRewardPoints] = useState({
    is_use_reward_points: false,
    reward_points: 0,
    reward_points_amount: 0,
  });
  useEffect(() => {
    if (appliedRewardPointsData?.cart?.applied_reward_points) {
      setAppliedRewardPoints(
        appliedRewardPointsData.cart.applied_reward_points,
      );
    }
  }, [appliedRewardPointsData]);
  const customerRewardPoints = useMemo(() => {
    return customerRewardPointsData?.customerRewardPoints;
  }, [customerRewardPointsData]);
  const [applyRewardPoints] = useMutation(APPLY_REWARD_POINTS);
  const [removeRewardPoints] = useMutation(REMOVED_REWARD_POINTS);
  const [rewardPointsLoading, setRewardPointsLoading] = useState(false);
  const onRewardPointsButtonPress = async apply => {
    setRewardPointsLoading(true);
    if (apply) {
      const resApplied = await applyRewardPoints({
        variables: {
          input: {
            cart_id: cartId,
          },
        },
      });
      setAppliedRewardPoints(
        resApplied.data.applyRewardPointsToCart.cart.applied_reward_points,
      );
      refetchCart(resApplied.data.applyRewardPointsToCart);
      setRewardPointsLoading(false);
    } else {
      const resRemoved = await removeRewardPoints({
        variables: {
          input: {
            cart_id: cartId,
          },
        },
      });
      setAppliedRewardPoints(
        resRemoved.data.removeRewardPointsFromCart.cart.applied_reward_points,
      );
      refetchCart(resRemoved.data.removeRewardPointsFromCart);
      setRewardPointsLoading(false);
    }
  };
  /**
   * end of @block {rewardPoint}
   */

  /**
   * ----------------------------------------- *
   * @block {placeOrder}
   * @summary block for handling place order
   * ----------------------------------------- *
   */
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [placeOrderHook] = useMutation(PLACE_ORDER);
  const [orderId, setOrderId] = useState('');
  const onPlaceOrder = async () => {
    if (selectedPaymentMethod && selectedPaymentMethod.title === '') {
      rxAppSnackbar({
        message: 'Please select your payment method first',
      });
    } else {
      setPlaceOrderLoading(true);
      try {
        const res = await placeOrderHook({
          variables: {
            input: {
              cart_id: cartId,
            },
          },
        });

        if (res) {
          const {code} = selectedPaymentMethod;
          if (code.indexOf('snap') !== -1) {
            setOrderId(res.data.placeOrder.order.order_number);
            loadSnapToken({
              variables: {
                orderId: res.data.placeOrder.order.order_number,
              },
            });
          } else {
            onCompletePayment(res.data.placeOrder.order.order_number);
          }
        } else {
          setPlaceOrderLoading(false);
        }
      } catch (error) {
        setPlaceOrderLoading(false);
        navigateTo(modules.cart.enable, modules.cart.name);
      }
    }
  };
  /**
   * end of @block {placeOrder}
   */

  /**
   * ----------------------------------------- *
   * @block {snap}
   * @summary block for handling snap
   * ----------------------------------------- *
   */
  const [loadSnapToken, snapTokenData] = customUseLazyQuery(GET_SNAP_TOKEN);
  const [loadSnapStatus, snapStatusData] = customUseLazyQuery(GET_SNAP_STATUS);
  const snapUrl = useMemo(() => {
    if (snapTokenData) {
      if (snapTokenData?.data?.getSnapTokenByOrderId?.redirect_url) {
        setPlaceOrderLoading(false);
        return snapTokenData?.data?.getSnapTokenByOrderId?.redirect_url;
      } else {
        if (
          placeOrderLoading &&
          snapTokenData?.data?.getSnapTokenByOrderId === null
        ) {
          rxAppSnackbar({
            message: 'Something went wrong with snap',
          });
          setPlaceOrderLoading(false);
        }
      }
    }
  }, [snapTokenData]);
  useEffect(() => {
    if (snapStatusData?.data?.getSnapOrderStatusByOrderId) {
      if (
        snapStatusData?.data?.getSnapOrderStatusByOrderId?.success === 'true'
      ) {
        onCompletePayment();
      } else {
        onUnCompletePayment();
      }
    }
  }, [snapStatusData]);
  const refetchSnap = () => {
    setPlaceOrderLoading(true);
    loadSnapStatus({
      variables: {
        orderId: orderId,
      },
    });
  };
  /**
   * end of @block {snap}
   */

  /**
   * ----------------------------------------- *
   * @block {addtional}
   * @summary block for handling additional
   * ----------------------------------------- *
   */
  const setAnalytics = isCompleted => {
    let shipping_tier = selectedShippingMethod?.method_title;
    let payment_type = selectedPaymentMethod?.title;

    AnalyticsHelper.eventAddShippingInfo({shipping_tier});
    AnalyticsHelper.eventAddPaymentInfo({payment_type});
    AnalyticsHelper.eventLogPurchase({
      transaction_id: orderId,
      currency: dataPrices?.grand_total?.currency,
      value: dataPrices?.grand_total?.value,
      is_complete: isCompleted,
    });
  };
  const onCompletePayment = async orderIdParam => {
    await setAnalytics(true);
    await resetCart();
    rxCartItems(null);
    rxCartIsVirtual(false);
    rxCartShippingAddress(null);
    rxCartShippingMethod(null);
    rxCartPaymentMethod(null);
    rxCartExtraFee(null);
    rxCartPrices(null);
    setPlaceOrderLoading(false);
    navigateTo(modules.cart_thankyou.enable, modules.cart_thankyou.name, {
      orderId: orderIdParam || orderId,
    });
  };
  const onUnCompletePayment = async () => {
    setPlaceOrderLoading(false);
    setAnalytics(false);
    await resetCart();
    await refetchCart();
    navigateTo(modules.cart.enable, modules.cart.name);
  };
  /**
   * end of @block {addtional}
   */

  return (
    <Views
      cartData={cartData}
      availablePaymentMethods={availablePaymentMethods}
      selectedPaymentMethod={selectedPaymentMethod}
      onSelectPaymentMethod={onSelectPaymentMethod}
      paymentMethodLoading={paymentMethodLoading}
      onPlaceOrder={onPlaceOrder}
      placeOrderLoading={placeOrderLoading}
      snapUrl={snapUrl}
      onCompletePayment={onCompletePayment}
      activeSections={activeSections}
      updateSections={updateSections}
      refetchSnap={refetchSnap}
      //
      selectedOptionExtraFee={selectedOptionExtraFee}
      onPressOption={onSelectExtraFee}
      extraFeeLoading={extraFeeLoading}
      dataFee={dataFee}
      selectedShippingMethod={selectedShippingMethod}
      dataPrices={dataPrices}
      dataExtraFee={dataExtraFee}
      //
      dataAppliedCoupons={dataAppliedCoupons}
      onCouponButtonPress={onCouponButtonPress}
      couponsLoading={couponsLoading}
      //
      storeCredit={storeCredit}
      storeCreditLoading={storeCreditLoading}
      dataAppliedStoreCredit={dataAppliedStoreCredit}
      onStoreCreditButtonPress={onStoreCreditButtonPress}
      //
      customerRewardPoints={customerRewardPoints}
      onRewardPointsButtonPress={onRewardPointsButtonPress}
      rewardPointsLoading={rewardPointsLoading}
      aplliedRewardPoints={aplliedRewardPoints}
      //
      onGiftCardButtonPress={onGiftCardButtonPress}
      giftCardLoading={giftCardLoading}
      appliedGiftCard={appliedGiftCard}
    />
  );
};

export default withProfiler(Payment, {name: 'Payment'});
