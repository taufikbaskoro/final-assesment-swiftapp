import {useReactiveVar} from '@apollo/client';
import {Storage} from '@app/helpers/Storage';
import {
  SET_BILLING_ADDRESS,
  SET_SHIPPING_ADDRESS,
} from '@app/_modules/cart/services/schema';
import {rxCartIsVirtual} from '@app/services/cache';
import {customUseMutation} from '@app/hooks/customApolloHooks';
import {useRefetchCart} from '@app/hooks/useRefetchCart';

export function useSelectShippingAddress() {
  const [selectShippingAddressHook] = customUseMutation(SET_SHIPPING_ADDRESS);
  const [selectBillingAddressHook] = customUseMutation(SET_BILLING_ADDRESS);
  const {refetch: refetchCart} = useRefetchCart();
  const cartIsVirtual = useReactiveVar(rxCartIsVirtual);

  const setDefautShippingToCart = async addressId => {
    if (!cartIsVirtual) {
      const cartId = await Storage.get(Storage.name.CART_ID);
      const gqlReturn = await selectShippingAddressHook({
        variables: {
          input: {
            cart_id: cartId,
            shipping_addresses: [{customer_address_id: addressId}],
          },
        },
      });
      if (gqlReturn) {
        refetchCart(gqlReturn.data.setShippingAddressesOnCart);
      }
    }
  };

  const setDefautBillingToCart = async addressId => {
    if (!cartIsVirtual) {
      const cartId = await Storage.get(Storage.name.CART_ID);
      await selectBillingAddressHook({
        variables: {
          input: {
            cart_id: cartId,
            billing_address: {customer_address_id: addressId},
          },
        },
      });
    }
  };

  return {setDefautShippingToCart, setDefautBillingToCart};
}
