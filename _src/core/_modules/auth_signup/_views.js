import React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Caption, TouchableRipple} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Otp from '@app/_modules/auth_signup/atoms/_Otp';
import Appbar from '@app/components/AppBar';
import styles from '@app/_modules/auth_signup/styles';
import Forms from '@app/components/_Forms/index';
import {formSchema, formSchemaOtp} from '@app/_modules/auth_signup/forms';

/**
 * @component AuthSignupView
 * @param {Object} Views.propTypes - defined using PropTypes
 * @profiler {Sentry}
 * @summary View Component for Sign Up
 * @returns Components
 */
function Views({
  isOtpEnabled,
  loading,
  modalOtp,
  onSubmit,
  onVerifyCreate,
  phoneNumber,
  onCloseModal,
  onNavigateSignIn,
}) {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <Appbar useBack title={t('register.title')} />
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t('login.titleScreen')}</Text>
        <Caption style={styles.caption}>{t('login.captionScreen')}</Caption>
        <Forms
          fields={formSchema}
          buttonTitle={t('register.button')}
          loading={loading}
          onSubmit={onSubmit}
        />
        {isOtpEnabled && (
          <Otp
            fields={formSchemaOtp}
            modalOtp={modalOtp}
            loading={loading}
            onVerifyCreate={onVerifyCreate}
            onCloseModal={onCloseModal}
            phoneNumber={phoneNumber}
          />
        )}

        <View style={styles.footerForm}>
          <Caption>Already have an account? </Caption>
          <TouchableRipple onPress={onNavigateSignIn}>
            <Caption style={styles.labelBold}>Login here</Caption>
          </TouchableRipple>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

Views.propTypes = {
  // use to determined is module otp enabled
  isOtpEnabled: PropTypes.bool.isRequired,
  //  loading state to disable/enable submit button
  loading: PropTypes.bool.isRequired,
  // use to determined modal visibility
  modalOtp: PropTypes.bool,
  // used as a callback function for submit button
  onSubmit: PropTypes.func.isRequired,
  // used as a callback function on verify otp button
  onVerifyCreate: PropTypes.func,
  // used to display phone number on modal otp
  phoneNumber: PropTypes.string,
  // used to close the otp modal
  onCloseModal: PropTypes.func,
  // use as a callback on button login
  onNavigateSignIn: PropTypes.func.isRequired,
};

export default withProfiler(Views, {name: 'AuthSignupView'});
