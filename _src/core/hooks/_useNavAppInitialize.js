import {useEffect, useRef} from 'react';
import {useReactiveVar} from '@apollo/client';
import {rxUserType} from '@app/services/cache';
import {useCartId} from '@app/hooks/useCartId';
import {useRefetchCart} from '@app/hooks/useRefetchCart';
import {useRefetchAddress} from '@app/hooks/useRefetchAddress';
import {useRefetchWishlist} from '@app/hooks/useRefetchWishlist';
import {USER_CUSTOMER} from '@app/helpers/Constants';
import crashlytics from '@react-native-firebase/crashlytics';
import DeviceInfo from 'react-native-device-info';

const useNavAppInitialize = () => {
  console.log('nav app init');
  const mount = useRef();
  const userType = useReactiveVar(rxUserType);
  const {refetch: onFetchUserCart} = useRefetchCart();
  const {refetch: onFetchAddress} = useRefetchAddress();
  const {refetch: onFetchWishlist} = useRefetchWishlist();
  const {getStoredCartId} = useCartId();
  /**
   * ---------------------------------------------------- *
   * @function {lifecycle hooks}
   * @summary handling from hooks userType
   * store cart id from local to client
   * when customer fetch data customer
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    if (userType) {
      getStoredCartId();
      if (userType === USER_CUSTOMER) {
        onFetchUserCart();
        onFetchAddress();
        onFetchWishlist();
      }
    }
  }, [userType]);

  /**
   * ---------------------------------------------------- *
   * @function {lifecycle}
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    mount.current = true;
    crashlytics().setUserId(DeviceInfo.getUniqueId());
    return () => (mount.current = false);
  }, []);

  return null;
};

export default useNavAppInitialize;
