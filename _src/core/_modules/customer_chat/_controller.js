import React from 'react';
import {withProfiler} from '@sentry/react-native';

import Views from '@app/_modules/customer_chat/_view';

const CustomerChatController = props => {
  /**
   * [props] set controller props
   * @return {object}
   */
  const controllerProps = {};

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(CustomerChatController, {
  name: 'CustomerChatController',
});
