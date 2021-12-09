import React, {useEffect, useState} from 'react';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {withProfiler} from '@sentry/react-native';
import {GET_CUSTOMER_SERVICE_CMS} from '@app/_modules/account_help/services/schema';

import Views from '@app/_modules/account_help/_view';
import {modules} from '@root/swift.config';

const Controller = props => {
  if (!modules.account_help.enable) {
    return null;
  }

  const [customerServiceCMS, setCustomerServiceCMS] = useState(null);
  const [title, setTitle] = useState(null);
  const {data, loading} = customUseQuery(GET_CUSTOMER_SERVICE_CMS);

  /**
   * [METHOD]
   * get data cms from server
   */
  useEffect(() => {
    if (data?.cmsPage) {
      setCustomerServiceCMS(data.cmsPage.content);
      setTitle(data.cmsPage.title);
    }
  }, [data]);

  /**
   * [PROPS]
   * set controller props
   */
  const controllerProps = {
    loading,
    customerServiceCMS,
    title,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(Controller, {name: 'HelpController'});
