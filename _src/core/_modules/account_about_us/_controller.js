import React, {useEffect, useState} from 'react';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {withProfiler} from '@sentry/react-native';
import {GET_ABOUT_CMS} from '@app/_modules/account_about_us/services/schema';
import {modules} from '@root/swift.config';

import Views from '@app/_modules/account_about_us/_view';

const Controller = props => {
  if (!modules.account_about_us.enable) {
    return null;
  }

  const [aboutCMS, setAboutCMS] = useState(null);
  const [title, setTitle] = useState(null);
  const {data, loading} = customUseQuery(GET_ABOUT_CMS);

  /**
   * [METHOD]
   * get data cms from server
   */
  useEffect(() => {
    if (data?.cmsPage) {
      setAboutCMS(data.cmsPage.content);
      setTitle(data.cmsPage.title);
    }
  }, [data]);

  /**
   * [PROPS]
   * set controller props
   */
  const controllerProps = {
    loading,
    aboutCMS,
    title,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(Controller, {name: 'AboutUsController'});
