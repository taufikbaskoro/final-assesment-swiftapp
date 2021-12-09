import {Storage} from './Storage';

/**
 * @function get cart id
 * @returns cartId
 */
export const getCartId = async () => {
  const cartIdData = await Storage.get(Storage.name.CART_ID);
  // const cartIdGuestData = await Storage.get(Storage.name.CART_ID_GUEST);

  let cartId = null;
  if (cartIdData !== null) {
    cartId = cartIdData?.data?.createEmptyCartCustom;
  } else {
    // const cart = await onGetTakeCart();
    // cartId = cart?.cart_id;
  }
  return cartId;
};
