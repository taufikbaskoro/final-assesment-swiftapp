import {useReactiveVar} from '@apollo/client';
import {customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {useEffect, useState} from 'react';
import {GET_CART as GET_CART_REMOTE} from '@app/_modules/cart/services/schema';
import {useCartId} from '@app/hooks/useCartId';
import {parsePaymentMethod} from '@app/helpers/Checkout';
import {rxCartId, rxCartPaymentMethod} from '@app/services/cache';

export function useRefetchPaymentMethod() {
  const cartId = useReactiveVar(rxCartId);
  const {getEmptyCart: resetCart} = useCartId();
  const [cartParamsData, setCartParamsData] = useState(null);
  const [cartDataState, setCartDataState] = useState(null);

  const [fetchCartDataRemote, cartDataRemote] = customUseLazyQuery(
    GET_CART_REMOTE,
    {
      fetchPolicy: 'network-only',
    },
  );

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
      setCartParamsData(cartData);
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
    if (cartParamsData) {
      return setCartDataState(cartParamsData);
    }
    if (cartDataRemote.data) {
      return setCartDataState(cartDataRemote.data);
    }
  }, [cartParamsData, cartDataRemote]);

  useEffect(() => {
    if (cartDataState && cartDataState?.cart) {
      if (cartDataState.cart?.selected_payment_method) {
        rxCartPaymentMethod(
          parsePaymentMethod(cartDataState.cart?.selected_payment_method),
        );
      }
    }
  }, [cartDataState]);

  return {refetch};
}
