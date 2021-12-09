import React, {useEffect, useMemo, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import {useMutation, useReactiveVar} from '@apollo/client';
import {
  customUseMutation,
  customUseQuery,
  customUseLazyQuery,
} from '@app/hooks/customApolloHooks';
import {useRefetchCart} from '@app/hooks/useRefetchCart';
import {useRefetchShipping} from '@app/hooks/useRefetchShipping';
import {useStoreConfig} from '@app/hooks/useStoreConfig';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';
import {useCartId} from '@app/hooks/useCartId';
import {
  rxCartPayment,
  rxCartShipping,
  rxCartAvailablePaymentMethod,
  rxCartId,
  rxCartIsVirtual,
  rxCartItems,
  rxCartPrices,
  rxCartExtraFee,
  rxCartPaymentMethod,
  rxAppLoading,
  rxCartShippingAddress,
  rxCartShippingMethod,
  rxAppSnackbar,
  rxUserType,
  rxUserWIshlistItems,
} from '@app/services/cache';

import {
  GET_SNAP_STATUS,
  GET_SNAP_TOKEN,
  PLACE_ORDER,
  SET_BILLING_ADDRESS,
  SET_PAYMENT_METHOD,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_METHOD,
  GET_CART_PRICES,
} from '@app/_modules/cart/services/schema';

import AnalyticsHelper from '@app/helpers/Analytics';
import Views from '@app/_modules/cart_onestepcheckout/_view';

const OneStepCheckout = ({navigation}) => {
  if (!modules.cart_onestepcheckout.enable) {
    return null;
  }

  const cartId = useReactiveVar(rxCartId);
  const cartIsVirtual = useReactiveVar(rxCartIsVirtual);
  const userType = useReactiveVar(rxUserType);
  const cartDataClient = useReactiveVar(rxCartItems);
  const clientWishlistData = useReactiveVar(rxUserWIshlistItems);
  const selectedShippingAddress = useReactiveVar(rxCartShippingAddress);
  const selectedShippingMethod = useReactiveVar(rxCartShippingMethod);
  const activeSections = useReactiveVar(rxCartShipping);
  const availablePaymentMethodsData = useReactiveVar(
    rxCartAvailablePaymentMethod,
  );
  const selectedPaymentMethod = useReactiveVar(rxCartPaymentMethod);
  const {refetch: setCartClientState} = useRefetchCart();
  const {refetch: refetchShipping} = useRefetchShipping();

  const [coreConfig] = useStoreConfig();

  const [currentStep, setCurrentStep] = useState(1);

  const [selectPaymentMethodHook] = customUseMutation(SET_PAYMENT_METHOD);
  const [selectShippingMethodHook] = customUseMutation(SET_SHIPPING_METHOD);
  const [rxCartShippingMethodiables, setrxCartShippingMethodiables] =
    useState(null);
  const [rxCartPaymentMethodiables, setrxCartPaymentMethodiables] =
    useState(null);

  const [summaryLoading, setSummaryLoading] = useState(false);

  const [localSelectedPaymentMethod, setLocalSelectedPaymentMethod] =
    useState(null);
  const [localSelectedShippingMethod, setLocalSelectedShippingMethod] =
    useState(null);

  const {getEmptyCart: resetCart} = useCartId();

  useEffect(() => {
    if (selectedPaymentMethod) {
      setLocalSelectedPaymentMethod(selectedPaymentMethod);
      setrxCartPaymentMethodiables({
        input: {
          cart_id: cartId,
          payment_method: {
            code: selectedPaymentMethod.code,
          },
        },
      });
    }
  }, [selectedPaymentMethod]);

  useEffect(() => {
    if (selectedShippingMethod) {
      setLocalSelectedShippingMethod(selectedShippingMethod);
      setrxCartShippingMethodiables({
        input: {
          cart_id: cartId,
          shipping_methods: [
            {
              carrier_code: selectedShippingMethod.carrier_code,
              method_code: selectedShippingMethod.method_code,
            },
          ],
        },
      });
    }
  }, [selectedShippingMethod]);

  const [cartPrices, setCartPrices] = useState(null);
  const [loadCartPrices, cartPricesData] = customUseLazyQuery(GET_CART_PRICES);
  useEffect(() => {
    if (cartPricesData?.data) {
      setCartPrices(cartPricesData?.data.cart);
    }
  }, [cartPricesData]);

  // setting client state
  useEffect(() => {
    setCartClientState();
    refetchShipping();
  }, []);

  // using data from cart client state
  const cart = useMemo(() => {
    // adding wishlistId to product
    if (userType === 'customer') {
      if (cartDataClient && clientWishlistData) {
        let cartDataTmp = [];
        cartDataClient?.forEach(cartItem => {
          let cartItemTmp = cartItem;
          clientWishlistData.forEach(wishlistItem => {
            if (cartItem.productId === wishlistItem.productId) {
              cartItemTmp = {
                ...cartItemTmp,
                wishlistId: wishlistItem.wishlistId,
              };
            }
          });
          cartDataTmp.push(cartItemTmp);
        });
        return cartDataTmp;
      } else {
        return cartDataClient;
      }
    } else {
      if (cartDataClient) {
        return cartDataClient;
      } else {
        return null;
      }
    }
  }, [cartDataClient, clientWishlistData]);

  //shipping address
  const [selectShippingAddressHook] = customUseMutation(SET_SHIPPING_ADDRESS);
  const [selectBillingAddressHook] = customUseMutation(SET_BILLING_ADDRESS);
  const [shippingAddressLoading, setShippingAddressLoading] = useState(false);

  const onSelectShippingAddress = async address => {
    setShippingAddressLoading(true);
    try {
      let resShipping;
      if (!cartIsVirtual) {
        resShipping = await selectShippingAddressHook({
          variables: {
            input: {
              cart_id: cartId,
              shipping_addresses: [{customer_address_id: address.addressId}],
            },
          },
        });
      } else {
        resShipping = true;
      }

      const resBilling = await selectBillingAddressHook({
        variables: {
          input: {
            cart_id: cartId,
            billing_address: {customer_address_id: address.addressId},
          },
        },
      });

      if (resShipping && resBilling) {
        refetchShipping(resBilling?.data?.setBillingAddressOnCart);
        rxCartShippingMethod(null);
        setShippingAddressLoading(false);
      } else {
        setShippingAddressLoading(false);
      }
    } catch (error) {
      setShippingAddressLoading(false);
    }
  };

  //shipping method
  const updateSections = activeSection => {
    rxCartShipping(activeSection);
  };

  const getTitleGroupingShipping = keyTitle => {
    switch (keyTitle) {
      case 'sg-freeshipping':
        return {
          title: 'Free Shipping',
          icon: 'inbox',
        };
      case 'sg-express':
        return {
          title: 'Express',
          icon: 'motorcycle',
        };
      case 'sg-nextday':
        return {
          title: 'Next Day',
          icon: 'car',
        };
      default:
        return {
          title: 'Reguler',
          icon: 'truck',
        };
    }
  };

  const groupingShipping = (available, config) => {
    const resultGroupingShipping = [];
    if (available && available.length > 0) {
      Object.keys(config).map((key, index) => {
        const shippingConfigs = config[key].toLowerCase().split(',');
        const filteredShipping = available.filter(item => {
          const firstConfig = `${item.carrier_code}_${item.method_code}`;
          const secondConfig = `${item.carrier_code}_${item.carrier_title}-${item.method_title}`;
          return (
            shippingConfigs.includes(firstConfig.toLocaleLowerCase()) ||
            shippingConfigs.includes(secondConfig.toLocaleLowerCase())
          );
        });
        if (selectedShippingMethod) {
          if (
            filteredShipping.filter(
              item => item.method_code === selectedShippingMethod.method_code,
            ).length > 0
          ) {
            if (activeSections.length === 0) {
              updateSections([index]);
            }
          }
        }
        const singleShippingConfig = getTitleGroupingShipping(key);
        resultGroupingShipping.push({
          title: singleShippingConfig.title,
          icon: singleShippingConfig.icon,
          value: filteredShipping,
        });
      });
    }
    return resultGroupingShipping;
  };

  const shippingConfig = coreConfig
    ? JSON.parse(coreConfig.shipments_configuration)
    : null;

  const availableShippingMethods =
    selectedShippingAddress && shippingConfig
      ? groupingShipping(
          selectedShippingAddress.available_shipping_methods,
          shippingConfig,
        )
      : [];

  const onSelectShippingMethod = async method => {
    if (method.error_message) {
    } else {
      let methodTmp = {...method, amount: method.amount.value};
      setLocalSelectedShippingMethod(methodTmp);
      setrxCartShippingMethodiables({
        input: {
          cart_id: cartId,
          shipping_methods: [
            {
              carrier_code: method.carrier_code,
              method_code: method.method_code,
            },
          ],
        },
      });
    }
  };

  /////////////////////////////////////////////////////////////
  // payment method
  const updateSectionsPayment = activeSection => {
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
              updateSectionsPayment([index]);
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
    setLocalSelectedPaymentMethod(method);
    setrxCartPaymentMethodiables({
      input: {
        cart_id: cartId,
        payment_method: {
          code: method.code,
        },
      },
    });
  };
  // ///////////////////////////////////////////////
  const onSummaryStep = async () => {
    if (!localSelectedShippingMethod) {
      return rxAppSnackbar({message: 'Shipping method not selected yet'});
    }

    if (!localSelectedPaymentMethod) {
      return rxAppSnackbar({message: 'Payment method not selected yet'});
    }

    try {
      setSummaryLoading(true);
      setCurrentStep(currentStep + 1);

      await selectShippingMethodHook({
        variables: rxCartShippingMethodiables,
      });
      await selectPaymentMethodHook({
        variables: rxCartPaymentMethodiables,
      });

      // req & adjust total here
      await loadCartPrices({
        variables: {
          cartId,
        },
      });
      // //////////
      setSummaryLoading(false);
    } catch (error) {
      if (error.graphQLErrors[0]) {
        const {message} = error.graphQLErrors[0];
        rxAppSnackbar({message});
      }
      setCurrentStep(1);
      navigateTo(modules.cart.enable, modules.cart.name);
    }
  };

  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [placeOrderHook] = useMutation(PLACE_ORDER);
  const [orderId, setOrderId] = useState('');

  const {data: snapTokenData, error: snapTokenError} = customUseQuery(
    GET_SNAP_TOKEN,
    {
      variables: {
        orderId: orderId,
      },
    },
  );

  const onPlaceOrder = async () => {
    setPlaceOrderLoading(true);
    rxAppLoading(true);
    try {
      // place order
      const res = await placeOrderHook({
        variables: {
          input: {
            cart_id: cartId,
          },
        },
      });

      if (res) {
        rxAppLoading(false);
        const {code} = selectedPaymentMethod;
        if (code.indexOf('snap') !== -1) {
          setOrderId(res.data.placeOrder.order.order_number);
        } else {
          onCompletePayment(res.data.placeOrder.order.order_number);
        }
      } else {
        setPlaceOrderLoading(false);
        rxAppLoading(false);
      }
    } catch (error) {
      setPlaceOrderLoading(false);
      rxAppLoading(false);
      if (error.graphQLErrors[0]) {
        const {message} = error.graphQLErrors[0];
        rxAppSnackbar({message});
      }
      navigateTo(modules.cart.enable, modules.cart.name);
    }
  };

  const setAnalytics = isCompleted => {
    let shipping_tier = selectedShippingMethod?.method_title;
    let payment_type = selectedPaymentMethod?.title;

    AnalyticsHelper.eventAddShippingInfo({shipping_tier});
    AnalyticsHelper.eventAddPaymentInfo({payment_type});
    AnalyticsHelper.eventLogPurchase({
      transaction_id: orderId,
      currency: cartPrices?.grand_total?.currency,
      value: cartPrices?.grand_total?.value,
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
    setAnalytics(false);
    await resetCart();
    // await refetchCart();
    navigateTo(modules.cart.enable, modules.cart.name);
  };

  const snapUrl = useMemo(() => {
    if (snapTokenData) {
      if (snapTokenData?.getSnapTokenByOrderId?.redirect_url) {
        return snapTokenData?.getSnapTokenByOrderId?.redirect_url;
      } else {
        if (
          placeOrderLoading &&
          snapTokenData?.getSnapTokenByOrderId === null
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
    if (snapTokenError && orderId) {
      setPlaceOrderLoading(false);
      navigateTo(modules.cart.enable, modules.cart.name);
    }
  }, [snapTokenError]);

  const [orderIdStatus, setOrderIdStatus] = useState('');
  const {data: snapStatusData} = customUseQuery(GET_SNAP_STATUS, {
    variables: {
      orderId: orderIdStatus,
    },
  });

  const refetchSnap = () => {
    setOrderIdStatus(orderId);
  };

  useEffect(() => {
    if (snapStatusData?.getSnapOrderStatusByOrderId) {
      if (snapStatusData?.getSnapOrderStatusByOrderId?.success === 'true') {
        onCompletePayment();
      } else {
        onUnCompletePayment();
      }
    }
  }, [snapStatusData]);

  return (
    <Views
      navigation={navigation}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      cartItems={cart}
      onSelectShippingAddress={onSelectShippingAddress}
      shippingAddressLoading={shippingAddressLoading}
      availableShippingMethods={availableShippingMethods}
      selectedShippingMethod={localSelectedShippingMethod}
      onSelectShippingMethod={onSelectShippingMethod}
      availablePaymentMethods={availablePaymentMethods}
      selectedPaymentMethod={localSelectedPaymentMethod}
      onSelectPaymentMethod={onSelectPaymentMethod}
      onSummaryStep={onSummaryStep}
      summaryLoading={summaryLoading}
      cartPrices={cartPrices}
      snapUrl={snapUrl}
      refetchSnap={refetchSnap}
      onPlaceOrder={onPlaceOrder}
    />
  );
};

export default withProfiler(OneStepCheckout, {name: 'OneStepCheckout'});
