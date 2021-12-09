import {withProfiler} from '@sentry/react-native';
import WebViewContent from '@app/components/WebViewContent';
import {ActivityIndicator} from 'react-native-paper';

import React from 'react';
import NoData from '@app/components/NoData';

const Views = ({loading, title, customerServiceCMS}) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  if (!customerServiceCMS) {
    return <NoData />;
  }
  return <WebViewContent htmlBlock={customerServiceCMS} title={title} />;
};

export default withProfiler(Views, {name: 'HelpView'});
