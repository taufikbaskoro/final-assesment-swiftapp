import React from 'react';
import {withProfiler} from '@sentry/react-native';
import {navigateTo} from '@app/helpers/Navigation';
import {rxAppSnackbar} from '@app/services/cache';
import {modules} from '@root/swift.config';

import Views from '@app/_modules/account_trackorder/_view';

const TrackOrder = () => {
  if (!modules.account_trackorder.enable) {
    return null;
  }

  /**
   * ---------------------------------------------------- *
   * @function onPostData
   * @summary post data for track order
   * ---------------------------------------------------- *
   */

  const onPostData = data => {
    const email = data.email;
    const order_number = data.order_number;
    navigateTo(
      modules.account_purchases_detail.enable,
      modules.account_purchases_detail.name,
      {
        email,
        order_number,
      },
    );
  };

  /**
   * ---------------------------------------------------- *
   * @function onPostError
   * @summary on event for error in forms
   * ---------------------------------------------------- *
   */
  const onPostError = () => {
    rxAppSnackbar({message: 'Please complete all fields'});
  };

  /**
   * ---------------------------------------------------- *
   * @constant controllerProps
   * @return {object}
   * ---------------------------------------------------- *
   */
  const controllerProps = {
    onPostData,
    onPostError,
  };

  return <Views {...controllerProps} />;
};

export default withProfiler(TrackOrder, {name: 'TrackOrder'});
