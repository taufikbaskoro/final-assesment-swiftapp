import React from 'react';
import {withProfiler} from '@sentry/react-native';

import Views from '@app/_modules/_blank/_view';

const Controller = props => {
  /**
   * ---------------------------------------------------- *
   * @constant controllerProps
   * @return {object}
   * ---------------------------------------------------- *
   */
  const controllerProps = {};

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(Controller, {name: 'BlankController'});
