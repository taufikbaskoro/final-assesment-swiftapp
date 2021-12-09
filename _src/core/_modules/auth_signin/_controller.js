import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import {Storage} from '@app/helpers/Storage';
import {rxUserType, rxUserToken, rxAppSnackbar} from '@app/services/cache';
import {LOGIN} from '@app/_modules/auth_signin/services/schema';
import {navigateTo} from '@app/helpers/Navigation';
import {useCartId} from '@app/hooks/useCartId';
import {modules} from '@root/swift.config';
import {USER_CUSTOMER, USER_TYPE, BEARER, EMAIL} from '@app/helpers/Constants';

import Views from '@app/_modules/auth_signin/_view';

const AuthSigninController = props => {
  if (!modules.auth_signin.enable) {
    return null;
  }

  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const {t} = useTranslation();
  const [onPostSignin] = useMutation(LOGIN);
  const [loading, setLoading] = useState(false);
  const {getStoredCartId: updateCartId} = useCartId();

  /**
   * ---------------------------------------------------- *
   * @function onSubmit
   * @summary on event request to server
   * ---------------------------------------------------- *
   */
  const onSubmit = async data => {
    setLoading(true);
    const variables = {
      userLogin: data.email,
      password: data.password,
    };
    try {
      const res = await onPostSignin({variables});
      const token = res?.data?.generateCustomerTokenCustom?.token;
      Storage.set(Storage.name.TOKEN, token);
      rxUserToken(token);
      crashlytics().setAttribute(BEARER, token);
      Storage.set(Storage.name.USER_TYPE, USER_CUSTOMER);
      rxUserType(USER_CUSTOMER);
      crashlytics().setAttribute(USER_TYPE, USER_CUSTOMER);
      crashlytics().setAttribute(EMAIL, data.email);
      updateCartId();

      setLoading(false);
    } catch (err) {
      rxAppSnackbar({message: err.toString()});
      setLoading(false);
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function onErrorSubmit
   * @summary on event for error in forms
   * ---------------------------------------------------- *
   */
  const onErrorSubmit = () => {
    rxAppSnackbar({message: 'Please complete all fields'});
  };

  /**
   * ---------------------------------------------------- *
   * @function onNavigateSignup
   * @summary navigation to sign up page
   * ---------------------------------------------------- *
   */
  const onNavigateSignup = () => {
    navigateTo(modules.auth_signup.enable, modules.auth_signup.name);
  };

  /**
   * ---------------------------------------------------- *
   * @constant {controllerProps}
   * @summary set controller props
   * ---------------------------------------------------- *
   */
  const controllerProps = {
    t,
    loading,
    onSignin: onSubmit,
    onError: onErrorSubmit,
    onNavigateSignup,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(AuthSigninController, {
  name: 'AuthSigninController',
});
