import React, {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import {useRefetchAddress} from '@app/hooks/useRefetchAddress';
import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import {rxAppSnackbar} from '@app/services/cache';

import {UPDATE_ACCOUNT_INFORMATION} from '@app/_modules/account_update_information/services/schema';
import Views from '@app/_modules/account_update_information/_view';
import {navigateTo} from '@app/helpers/Navigation';
import {formSchema} from '@app/_modules/account_update_information/forms';
import {modules} from '@root/swift.config';

/**
 * @component UpdateAccountInformation
 * @param {Object} navigation
 * @param {Object} route
 * @profiler {Sentry}
 * @summary Controller for update account screen
 */
const UpdateAccountInformation = ({navigation, route}) => {
  if (!modules.account_update_information.enable) {
    return null;
  }

  const {t} = useTranslation();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateAccountInformationHook] = useMutation(
    UPDATE_ACCOUNT_INFORMATION,
  );
  const {refetch} = useRefetchAddress();

  useEffect(() => {
    if (route) {
      // Props from previous screen
      const {firstname, lastname, email} = route.params.accountInformationData;
      // Set default value to the form schema
      const formSchemaState = formSchema({
        email: email,
        firstName: firstname,
        lastName: lastname,
      });
      setForms(formSchemaState);
    }
  }, [route]);

  /**
   * @function updateAccountInformation
   * @param {Object} data - forms value {email, firstName, lastName}
   * @summary function callback onSubmit event from
   * useForm to update user information
   */
  const updateAccountInformation = async data => {
    try {
      setLoading(true);
      const res = await updateAccountInformationHook({
        variables: {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
        },
      });
      await refetch(res.data.updateCustomer);
      rxAppSnackbar({message: 'Your information has been updated'});
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      rxAppSnackbar({message: err.toString()});
      setLoading(false);
    }
  };

  /**
   * @function onNavigateToChangePassword
   * @constant {Boolean} modules.account_change_password.enable
   * @constant {String} modules.account_change_password.name
   * @summary function callback to navigate to change password screen
   */
  const onNavigateToChangePassword = () =>
    navigateTo(
      modules.account_change_password.enable,
      modules.account_change_password.name,
    );

  const controllerProps = {
    t,
    loading,
    formSchema: forms,
    route,
    navigation,
    updateAccountInformation,
    onNavigateToChangePassword,
  };

  return <Views {...controllerProps} />;
};

export default withProfiler(UpdateAccountInformation, {
  name: 'UpdateAccountInformation',
});
