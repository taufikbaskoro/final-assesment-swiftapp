import React, {useEffect, useState} from 'react';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {withProfiler} from '@sentry/react-native';
import {GET_CONTACT_CMS} from '@app/_modules/account_contact_us/services/schema';

import Views from '@app/_modules/account_contact_us/_view';
import {modules} from '@root/swift.config';

const Controller = props => {
  if (!modules.account_contact_us.enable) {
    return null;
  }
  const [contactCMS, setContactCMS] = useState(null);
  const [title, setTitle] = useState(null);
  const {data, loading} = customUseQuery(GET_CONTACT_CMS);

  /**
   * [METHOD]
   * get data cms from server
   */
  useEffect(() => {
    if (data?.cmsBlocks?.items.length > 0) {
      setContactCMS(data.cmsBlocks.items[0].content);
      setTitle(data.cmsBlocks.items[0].title);
    }
  }, [data]);

  /**
   * [PROPS]
   * set controller props
   */
  const controllerProps = {
    loading,
    contactCMS,
    title,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(Controller, {name: 'ContactUsController'});
