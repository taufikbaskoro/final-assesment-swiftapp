import React from 'react';
import {withProfiler} from '@sentry/react-native';

import NavBar from '@app/components/NavBar';
import FontSizeSelector from '@app/components/FontSizeSelector';

const SettingsScreen = () => {
  return (
    <>
      <NavBar title="Settings" />
      <FontSizeSelector />
    </>
  );
};

export default withProfiler(SettingsScreen, {name: 'SettingScreen'});
