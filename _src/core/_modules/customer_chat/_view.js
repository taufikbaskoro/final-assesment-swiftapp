import React from 'react';
import {withProfiler} from '@sentry/react-native';
import {WebView} from 'react-native-webview';

import {modules} from '@root/swift.config';

const Views = () => {
  if (!modules.customer_chat.enable) {
    return null;
  }
  return (
    <WebView
      source={{uri: 'https://tawk.to/chat/60ebbe0a649e0a0a5ccbb32e/1facdsmkq'}}
    />
  );
};

export default withProfiler(Views, {name: 'BlankView'});
