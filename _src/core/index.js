import React from 'react';
import AppNavigator from '@app/navigations';
import client from '@app/services/api';

import {ApolloProvider} from '@apollo/client';

import 'react-native-gesture-handler';
import '@app/configs/sentry';
import '@app/configs/i18n';
import '@app/configs/global';

const Core = () => {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
};

export default Core;
