import {useReactiveVar} from '@apollo/client';
import {customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {useEffect, useState, useMemo} from 'react';
import {GET_CART as GET_CART_REMOTE} from '@app/_modules/cart/services/schema';
import {useCartId} from '@app/hooks/useCartId';
import {useCartItems} from '@app/hooks/useCartItems';
import {useCartPrices} from '@app/hooks/useCartPrices';
import {useRefetchPaymentMethod} from '@app/hooks/useRefetchPaymentMethod';
import {useAvailablePaymentMethod} from '@app/hooks/useAvailablePaymentMethods';
import {
  parseShippingAddress,
  parseShippingMethod,
  parseExtraFee,
  parseAppliedCoupons,
  parseAppliedStoreCredit,
} from '@app/helpers/Checkout';
import {
  rxCartId,
  rxCartShippingAddress,
  rxCartShippingMethod,
  rxCartExtraFee,
  rxCartAppliedStoreCredit,
  rxCartAppliedCoupon,
  rxCartGiftCard,
} from '@app/services/cache';

export function useRefetchCart() {
  const cartId = useReactiveVar(rxCartId);
  const {getEmptyCart: resetCart} = useCartId();
  const {refetch: refetchCartItems} = useCartItems();
  const {refetch: refetchCartPrices} = useCartPrices();
  const {refetch: refetchPaymentMethod} = useRefetchPaymentMethod();
  const {refetch: availablePaymentMethods} = useAvailablePaymentMethod();
  const [cartDataParams, setCartDataParams] = useState(null);

  const [fetchCartDataRemote, cartDataRemote] = customUseLazyQuery(
    GET_CART_REMOTE,
    {
      fetchPolicy: 'network-only',
    },
  );

  const cartDataState = useMemo(() => {
    if (cartDataParams) {
      return cartDataParams;
    }
    if (cartDataRemote.data) {
      return cartDataRemote.data;
    }
    return null;
  }, [cartDataParams, cartDataRemote]);

  const handleError = error => {
    if (error.graphQLErrors[0]) {
      const {category} = error.graphQLErrors[0].extensions;
      const {message} = error.graphQLErrors[0];
      if (
        category === 'graphql-authorization' &&
        message ===
          `The current user cannot perform operations on cart "${cartId}"`
      ) {
        resetCart();
      }

      if (
        category === 'graphql-no-such-entity' &&
        message === 'Current user does not have an active cart.'
      ) {
        resetCart();
      }
    }
  };

  const refetch = async cartData => {
    if (cartData) {
      setCartDataParams(cartData);
    } else {
      try {
        await fetchCartDataRemote({
          variables: {
            cartId,
          },
        });
      } catch (error) {
        handleError(error);
        throw new Error(error);
      }
    }
  };

  useEffect(() => {
    if (cartDataState && cartDataState?.cart) {
      //items
      if (cartDataState.cart?.items) {
        refetchCartItems(cartDataState);
      }

      //price
      if (cartDataState.cart?.prices) {
        refetchCartPrices(cartDataState);
      }

      //payment method
      if (cartDataState.cart?.selected_payment_method) {
        refetchPaymentMethod(cartDataState);
      }

      //extra fee
      if (cartDataState.cart?.applied_extra_fee) {
        rxCartExtraFee(parseExtraFee(cartDataState.cart?.applied_extra_fee));
      }

      //applied coupons
      if (cartDataState.cart?.applied_coupons) {
        rxCartAppliedCoupon(
          parseAppliedCoupons(cartDataState.cart?.applied_coupons),
        );
      }

      //applied giftcard
      if (cartDataState.cart?.applied_giftcard) {
        rxCartGiftCard(cartDataState.cart?.applied_giftcard);
      }

      //applied store credit
      if (cartDataState.cart?.applied_store_credit) {
        rxCartAppliedStoreCredit(
          parseAppliedStoreCredit(cartDataState.cart?.applied_store_credit),
        );
      }

      //available payment methods
      if (cartDataState.cart?.available_payment_methods) {
        availablePaymentMethods(cartDataState);
      }

      //shipping address
      if (cartDataState.cart?.shipping_addresses?.length) {
        const shippingAddressData = cartDataState.cart?.shipping_addresses[0];
        rxCartShippingAddress(parseShippingAddress(shippingAddressData));

        //shipping method
        if (shippingAddressData.selected_shipping_method) {
          rxCartShippingMethod(
            parseShippingMethod(shippingAddressData.selected_shipping_method),
          );
        }
      }
    }
  }, [cartDataState]);

  return {refetch};
}
