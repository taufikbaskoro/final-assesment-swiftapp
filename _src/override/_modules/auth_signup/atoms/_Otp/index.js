import React from 'react';
import PropTypes from 'prop-types';
import {withProfiler} from '@sentry/react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Caption, Portal, Modal, Text} from 'react-native-paper';
import Section from '@app/components/Section';
import Forms from '@app/components/_Forms/index';

import styles from '@app/_modules/auth_signup/atoms/_Otp/styles';

/**
 * @component AtomOtpSignUp
 * @param {type} AtomOtpComponent.propTypes
 * @profiler {Sentry}
 * @summary Atom Component for Sign up OTP
 * @returns Components
 */
function AtomOtpComponent({
  t,
  fields,
  modalOtp,
  loading,
  onVerifyCreate,
  onCloseModal,
  phoneNumber,
}) {
  return (
    <Portal>
      <Modal
        visible={modalOtp}
        dismissable={false}
        contentContainerStyle={styles.modalContainer}>
        <Icon
          name={'x'}
          size={30}
          style={styles.close}
          onPress={onCloseModal}
        />
        <Text style={styles.title}>Verify phone</Text>
        <Caption style={styles.caption}>
          Code has been sent to {phoneNumber}
        </Caption>

        <Forms
          fields={fields}
          buttonTitle={'Verify and Create Account'}
          loading={loading}
          onSubmit={onVerifyCreate}
        />
        <Section row centerChildren>
          <Text style={styles.label}>Didn't receive code? </Text>
          <Section>
            <Text style={styles.labelBold}>Request Again</Text>
          </Section>
        </Section>
      </Modal>
    </Portal>
  );
}

AtomOtpComponent.propTypes = {
  // use for translation
  t: PropTypes.func.isRequired,
  // use for rendering Form Field
  fields: PropTypes.array.isRequired,
  //use for modal visibility state
  modalOtp: PropTypes.bool,
  //use for loader state
  loading: PropTypes.bool,
  // use for submit button onPress
  onVerifyCreate: PropTypes.func.isRequired,
  // use for closing modal
  onCloseModal: PropTypes.func.isRequired,
  // use for displaying phone number in modal
  phoneNumber: PropTypes.func.isRequired,
};

export default withProfiler(AtomOtpComponent, {name: 'AtomOtpSignUp'});
