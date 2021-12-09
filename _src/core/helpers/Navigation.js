import * as React from 'react';
import {rxAppSnackbar} from '@app/services/cache';
import analytics from '@react-native-firebase/analytics';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  analytics().logEvent(name);
  navigationRef?.current?.navigate(name, params);
};

export const stackReset = (stacks = []) => {
  navigationRef?.current?.reset({
    index: 0,
    routes: stacks,
  });
};

export const navReset = (name, params = {}) => {
  navigationRef?.current?.reset({
    index: 0,
    routes: [{key: name, name, params}],
  });
};

export function navigateTo(isEnable, name, params = {}) {
  if (!isEnable) {
    return rxAppSnackbar({
      message: `${name} feature is currently disabled!`,
    });
  }
  analytics().logEvent(name);
  return navigationRef.current?.navigate(name, params);
}
