import {withProfiler} from '@sentry/react-native';
import WebViewContent from '@app/components/WebViewContent';
import {ActivityIndicator} from 'react-native-paper';

import React from 'react';
import NoData from '@app/components/NoData';

const Views = ({loading, title, aboutCMS}) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  if (!aboutCMS) {
    return <NoData />;
  }
  return <WebViewContent htmlBlock={aboutCMS} title={title} />;
};

export default withProfiler(Views, {name: 'AboutUsView'});
