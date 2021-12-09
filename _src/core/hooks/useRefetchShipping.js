import {useReactiveVar} from '@apollo/client';
import {customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {useEffect, useState, useMemo} from 'react';
import {GET_SHIPPING as GET_CART_REMOTE} from '@app/_modules/cart/services/schema';
import {useCartId} from '@app/hooks/useCartId';
import {
  parseShippingAddress,
  parseShippingMethod,
  parsePrices,
  parseBillingAddress,
} from '@app/helpers/Checkout';
import {
  rxCartBillingAddress,
  rxCartId,
  rxCartPrices,
  rxCartShippingAddress,
  rxCartShippingMethod,
} from '@app/services/cache';

export function useRefetchShipping() {
  const cartId = useReactiveVar(rxCartId);
  const {getEmptyCart: resetCart} = useCartId();
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
      //price
      if (cartDataState.cart?.prices) {
        rxCartPrices(parsePrices(cartDataState.cart?.prices));
      }

      //billing address
      if (cartDataState.cart?.billing_address) {
        const billingAddressData = cartDataState.cart?.billing_address;
        rxCartBillingAddress(parseBillingAddress(billingAddressData));
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
