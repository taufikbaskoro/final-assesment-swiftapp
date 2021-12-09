import {Linking, Platform} from 'react-native';
import {
  STOREURL_ANDROID,
  STOREID_ANDROID,
  STOREURL_IOS,
  STOREID_IOS,
} from '@app/helpers/Constants';

const isIOS = Platform.OS === 'ios';

export const onGoStore = () => {
  const urlStore = isIOS
    ? `${STOREURL_IOS}/${STOREID_IOS}?mt=8`
    : `${STOREURL_ANDROID}?id=${STOREID_ANDROID}`;
  Linking.openURL(urlStore).catch(err => {
    console.log('[err] error linking', err);
  });
};
