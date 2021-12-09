import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {GET_RETURN_CMS} from '@app/_modules/account_returns/services/schema';
import {customUseQuery} from '@app/hooks/customApolloHooks';

import WebViewContent from '@app/components/WebViewContent';
import {modules} from '@root/swift.config';

const Returns = () => {
  if (!modules.account_returns.enable) {
    return null;
  }

  const {data, loading} = customUseQuery(GET_RETURN_CMS);
  const [returnsCMS, setReturnsCMS] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (data) {
      setReturnsCMS(data.cmsPage.content);
      setTitle(data.cmsPage.title);
    }
  }, [data]);

  if (loading) {
    return <ActivityIndicator />;
  }
  return <WebViewContent htmlBlock={returnsCMS} title={title} />;
};

export default withProfiler(Returns, {name: 'Returns'});
