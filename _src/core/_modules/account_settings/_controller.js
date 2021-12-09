import React from 'react';
import {withProfiler} from '@sentry/react-native';

import Views from '@app/_modules/account_settings/_view';
import {modules} from '@root/swift.config';

const Settings = () => {
  if (!modules.account_settings.enable) {
    return null;
  }

  return <Views />;
};

export default withProfiler(Settings, {name: 'Settings'});
