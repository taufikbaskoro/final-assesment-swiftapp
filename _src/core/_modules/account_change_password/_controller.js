import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import {CHANGE_PASSWORD} from '@app/_modules/account_change_password/services/schema';
import Views from '@app/_modules/account_change_password/_view';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

/**
 * @component ChangePassword
 * @param {Object} props
 * @profiler {Sentry}
 * @summary Controller for update account screen
 */
const ChangePassword = props => {
  // render null on module false
  if (!modules.account_change_password.enable) {
    return null;
  }

  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [changePasswordHook] = useMutation(CHANGE_PASSWORD);

  /**
   * @function changePassword
   * @param {Object} data - forms value {currentPassword, newPassword}
   * @summary function callback onSubmit event from
   * useForm to update password
   */
  const changePassword = async data => {
    try {
      setLoading(true);
      await changePasswordHook({
        variables: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      });
      setLoading(false);
      navigateTo(
        modules.account_myaccount.enable,
        modules.account_myaccount.name,
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const controllerProps = {
    t,
    loading,
    changePassword,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(ChangePassword, {name: 'ChangePassword'});
