import {useEffect, useRef, useCallback} from 'react';
import {Storage} from '@app/helpers/Storage';
import {rxUserToken, rxUserType} from '@app/services/cache';

const useSetUserData = () => {
  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const mount = useRef();
  const onRefetchData = useCallback(async () => {
    const getUserToken = await Storage.get(Storage.name.TOKEN);
    const getUserType = await Storage.get(Storage.name.USER_TYPE);
    rxUserToken(getUserToken);
    rxUserType(getUserType);
  }, []);

  /**
   * ---------------------------------------------------- *
   * @function {lifecycle}
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    mount.current = true;
    if (mount.current) {
      onRefetchData();
    }
    return () => (mount.current = false);
  }, []);

  return null;
};

export default useSetUserData;
