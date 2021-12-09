import React from 'react';
import {useReactiveVar} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {Storage} from '@app/helpers/Storage';
import {modules} from '@root/swift.config';
import {USER_GUEST} from '@app/helpers/Constants';
import {navReset} from '@app/helpers/Navigation';
import {navigateTo} from '@app/helpers/Navigation';

import Views from '@app/_modules/account/_view';
import ViewLogin from '@app/_modules/auth_signin/_controller';

import {
  rxUserToken,
  rxUserType,
  rxUserAddresses,
  rxCartId,
  rxCartItems,
  rxUserWIshlistItems,
  rxUserInformation,
} from '@app/services/cache';

const Account = ({navigation}) => {
  if (!modules.account.enable) {
    return null;
  }

  /**
   * ---------------------------------------------------- *
   * @constant controllerProps
   * @summary collections constant for
   * this contorller
   * ---------------------------------------------------- *
   */
  const userType = useReactiveVar(rxUserType);
  const userData = useReactiveVar(rxUserInformation);

  /**
   * ---------------------------------------------------- *
   * @function onLogOut
   * @summary clear all client and local storage
   * ---------------------------------------------------- *
   */
  const onLogOut = async () => {
    try {
      rxUserType(null);
      rxUserToken(null);
      rxCartItems(null);
      rxCartId(null);
      rxUserWIshlistItems(null);
      rxUserAddresses(null);
      await Storage.clear();
      navReset(modules.auth_landing.name);
    } catch (err) {
      console.log('[err] logout', err);
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function onEditProfile
   * @summary navigate to edit profile
   * ---------------------------------------------------- *
   */

  const onEditProfile = () => {
    navigateTo(
      modules.account_update_information.enable,
      modules.account_update_information.name,
      {accountInformationData: userData},
    );
  };

  if (userType === USER_GUEST) {
    return <ViewLogin />;
  }

  return (
    <Views
      navigation={navigation}
      onLogOut={onLogOut}
      userData={userData}
      onEditProfile={onEditProfile}
    />
  );
};

export default withProfiler(Account, {name: 'Account'});
