import React from 'react';
import {Text} from 'react-native';
import {PropTypes} from 'prop-types';
import {withProfiler} from '@sentry/react-native';

import {modules} from '@root/swift.config';
/**
 * ---------------------------------------------------- *
 * @components Views
 * @summary this is expample views
 * ---------------------------------------------------- *
 */
const Views = () => {
  if (!modules.blank.enable) {
    return null;
  }
  return <Text>Blank View</Text>;
};

Views.propTypes = {
  name: PropTypes.function /* @summary use for translation */,
};

export default withProfiler(Views, {name: 'BlankView'});
