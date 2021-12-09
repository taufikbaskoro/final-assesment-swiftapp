import {withProfiler} from '@sentry/react-native';
import Appbar from '@app/components/AppBar';
import WebViewContent from '@app/components/WebViewContent';
import {ActivityIndicator} from 'react-native-paper';

import React from 'react';
import NoData from '@app/components/NoData';

const Views = ({loading, title, contactCMS}) => {
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <Appbar useBack title={'Contact Us'} />
      {!contactCMS ? (
        <NoData />
      ) : (
        <WebViewContent htmlBlock={contactCMS} title={title} />
      )}
    </>
  );
};

export default withProfiler(Views, {name: 'ContactUsView'});
