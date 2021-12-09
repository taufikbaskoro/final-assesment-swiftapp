import React from 'react';
import {withProfiler} from '@sentry/react-native';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AppBarComponent from '@app/components/AppBar';
import {formSchema} from '@app/_modules/account_change_password/forms';
import FormComponent from '@app/components/_Forms/index';

import styles from '@app/_modules/account_change_password/styles';
/**
 * @component ChangePasswordView
 * @param {Object} Views.propTypes - defined on prop types
 * @constant {Array} formSchema
 * @profiler {Sentry}
 * @summary Stateless  view for change password screen
 * @returns Components
 */
const Views = ({t, loading, changePassword}) => {
  return (
    <SafeAreaView>
      <AppBarComponent useBack title="Change Password" />
      <KeyboardAwareScrollView style={styles.subContainer}>
        <FormComponent
          loading={loading}
          fields={formSchema}
          buttonTitle={'Change Password'}
          onSubmit={changePassword}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

Views.propTypes = {
  //translation for any labels
  t: PropTypes.func,
  // loading state for button in form
  loading: PropTypes.bool,
  //onSubmit callback to use in form
  changePassword: PropTypes.func.isRequired,
};

export default withProfiler(Views, {name: 'ChangePasswordView'});
