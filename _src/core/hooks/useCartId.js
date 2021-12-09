import {useMutation} from '@apollo/client';
import {Alert} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import {Storage} from '@app/helpers/Storage';
import {CREATE_EMPTY_CART, MERGE_CARTS} from '@app/services/queries/cart';
import {CART_ID, USER_GUEST, USER_CUSTOMER} from '@app/helpers/Constants';
import {rxCartId} from '@app/services/cache';

export function useCartId() {
  const [createEmptyCart] = useMutation(CREATE_EMPTY_CART);
  const [mergeCarts] = useMutation(MERGE_CARTS);

  const getEmptyCart = async (userType, retryCounter = 0) => {
    try {
      const res = await createEmptyCart();

      if (typeof res?.data?.createEmptyCart !== 'string') {
        throw new Error('Cart ID invalid type');
      }

      await Storage.set(Storage.name.CART_ID, res.data.createEmptyCart);

      if (userType === USER_GUEST) {
        await Storage.set(Storage.name.CART_ID_GUEST, res.data.createEmptyCart);
      } else {
        const guestCartId = await Storage.get(Storage.name.CART_ID_GUEST);
        if (guestCartId) {
          Storage.set(Storage.name.CART_ID_GUEST, null);
          await mergeCarts({
            variables: {
              source_cart_id: guestCartId,
              destination_cart_id: res.data.createEmptyCart,
            },
          });
        }
      }

      rxCartId(res.data.createEmptyCart);
      crashlytics().setAttribute(CART_ID, res.data.createEmptyCart);

      return res.data.createEmptyCart;
    } catch (error) {
      // console.log('Error create empty cart : ', error);
      Alert.alert(
        'Error create empty cart',
        error.message + (retryCounter < 2 ? '' : '\nWe will fix it shortly'),
        [
          {
            text: retryCounter < 2 ? 'Retry' : 'OK',
            onPress: () => {
              if (retryCounter < 2) {
                getEmptyCart(userType, retryCounter + 1);
              }
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const getStoredCartId = async () => {
    const cartId = await Storage.get(Storage.name.CART_ID);
    const userType = await Storage.get(Storage.name.USER_TYPE);

    if (!cartId || userType === USER_CUSTOMER) {
      getEmptyCart(userType);
    } else {
      crashlytics().setAttribute(CART_ID, cartId);
      rxCartId(cartId);
    }
  };

  return {getStoredCartId, getEmptyCart};
}
