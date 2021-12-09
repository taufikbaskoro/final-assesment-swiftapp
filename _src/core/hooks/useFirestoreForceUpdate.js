import {useEffect, useState, useRef} from 'react';
import DeviceInfo from 'react-native-device-info';
import checkVersion from 'react-native-store-version';
import FirestoreHelper from '../helpers/Firestore';
import {
  STOREURL_ANDROID,
  STOREID_ANDROID,
  STOREURL_IOS,
  STOREID_IOS,
} from '@app/helpers/Constants';

const useFirestoreForceUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState(false);
  const mount = useRef();

  const onInitFirestore = async () => {
    let isCanUpdate = false;
    const FirestoreListener = new FirestoreHelper();
    // console.log('FirestoreListener: ', FirestoreListener);
    FirestoreListener.onSnapshot(FirestoreListener.doc.MODULES, snapshot => {
      // console.log('snapshot: ', snapshot);
      if (snapshot !== null) {
        const modules = snapshot.data();
        // console.log('modules: ', modules);
        if (modules !== undefined) {
        }
      }
    });

    if (isCanUpdate) {
      try {
        const check = await checkVersion({
          version: DeviceInfo.getVersion(),
          iosStoreURL: `${STOREURL_IOS}/${STOREID_IOS}?mt=8`,
          androidStoreURL: `${STOREURL_ANDROID}?id=${STOREID_ANDROID}`,
          country: 'id',
        });

        if (check.result === 'new') {
          setUpdates(true);
        }
      } catch (e) {
        console.log(e);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    mount.current = true;
    if (mount.current) {
      onInitFirestore();
    }
    return () => (mount.current = false);
  }, [updates]);

  return {
    loading,
    updates,
  };
};

export default useFirestoreForceUpdate;
