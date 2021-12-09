import React from 'react';
import {Text} from 'react-native';
import {withProfiler} from '@sentry/react-native';

import {modules} from '@root/swift.config';

const Views = () => {
  if (!modules.account_returns.enable) {
    return null;
  }
  return <Text>Blank View</Text>;
};

export default withProfiler(Views, {name: 'BlankView'});
