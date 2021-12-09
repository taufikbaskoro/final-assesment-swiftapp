import {useReactiveVar} from '@apollo/client';
import React, {useEffect, useMemo} from 'react';
import {withProfiler} from '@sentry/react-native';

import {useRefetchCart} from '@app/hooks/useRefetchCart';
import {navigateTo} from '@app/helpers/Navigation';
import {
  rxCartItems,
  rxUserType,
  rxUserWIshlistItems,
  rxCartPrices,
} from '@app/services/cache';

import Views from '@app/_modules/cart/_view';
import {modules} from '@root/swift.config';

const Cart = () => {
  if (!modules.cart.enable) {
    return null;
  }

  /**
   * ---------------------------------------------------- *
   * @constant controllerProps
   * @summary collections constant for
   * this contorller
   * ---------------------------------------------------- *
   */
  const cartDataClient = useReactiveVar(rxCartItems);
  const clientWishlistData = useReactiveVar(rxUserWIshlistItems);
  const subTotal = useReactiveVar(rxCartPrices)?.subtotal_excluding_tax;
  const userType = useReactiveVar(rxUserType);
  const {refetch: setCartClientState} = useRefetchCart();

  /**
   * ----------------------------------------- *
   * @dependency []
   * @summary component did mount
   * request cart data
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    setCartClientState();
  }, []);

  /**
   * ----------------------------------------- *
   * @dependency [
   * cartDataClient,
   * clientWishlistData
   * ]
   * @summary store cart client data to
   * local state
   * @return {object} cart data local
   * ---------------------------------------------------- *
   */
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

  /**
   * ---------------------------------------------------- *
   * @function onNavigateToProductDetail
   * @summary navigate to product detail product
   * ---------------------------------------------------- *
   */
  const onNavigateToProductDetail = productUrlKey => {
    navigateTo(modules.product_detail.enable, modules.product_detail.name, {
      productUrlKey,
    });
  };

  /**
   * ---------------------------------------------------- *
   * @function onNavigateToShipping
   * @summary navigate to shpping page
   * ---------------------------------------------------- *
   */
  const onNavigateToShipping = () => {
    if (modules.cart_guestcheckout.enable) {
      if (cart?.length) {
        navigateTo(modules.cart_shipping.enable, modules.cart_shipping.name);
      }
    } else {
      if (userType === 'guest') {
        return navigateTo(modules.auth_signin.enable, modules.auth_signin.name);
      }
      if (cart?.length) {
        navigateTo(modules.cart_shipping.enable, modules.cart_shipping.name);
      }
    }
  };

  return (
    <Views
      subTotal={subTotal}
      cart={cart}
      onNavigateToProductDetail={onNavigateToProductDetail}
      onNavigateToShipping={onNavigateToShipping}
      userType={userType}
    />
  );
};

export default withProfiler(Cart, {name: 'Cart'});
