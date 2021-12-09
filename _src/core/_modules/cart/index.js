import React from 'react';
import {modules} from '@root/swift.config';

import Controller from '@app/_modules/cart/_controller';
import ControllerOneStepCheckout from '@app/_modules/cart_onestepcheckout';
import AddToCart from '@app/_modules/cart/atoms/AddToCart/index';
import RemoveFromCart from '@app/_modules/cart/atoms/RemoveFromCart';
import UpdateCartItem from '@app/_modules/cart/atoms/UpdateCartItem';

export const AddToCartButton = props => {
  if (modules.cart.enable) {
    return <AddToCart {...props} />;
  } else {
    return null;
  }
};

export const RemoveFromCartButton = props => {
  return <RemoveFromCart {...props} />;
};
export const UpdateCartItemModal = props => {
  return <UpdateCartItem {...props} />;
};

let CartController = Controller;
if (modules.cart_onestepcheckout.enable) {
  CartController = ControllerOneStepCheckout;
}

export default CartController;
