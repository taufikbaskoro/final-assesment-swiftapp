/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import {FORM_FIELD} from '@app/helpers/Constants';

/**
 * @constant {Array} formSchema
 * @summary use as Sign up OTP module form fields
 */
export const formSchemaOtp = [
  {
    name: 'otp',
    label: 'Verification Code',
    textContentType: 'oneTimeCode',
    keyboardType: 'number-pad',
    type: 'Input',
    defaultValue: '',
    rules: {required: 'Required'},
  },
];

/**
 * @constant {Array} formSchema
 * @summary use as Sign up form fields
 */
export const formSchema = [
  {
    name: 'email',
    label: 'Email',
    textContentType: 'emailAddress',
    type: FORM_FIELD.INPUT,
    defaultValue: '',
    keyboardType: 'email-address',
    rules: {
      required: 'Email required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Entered value does not match email format',
      },
    },
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: FORM_FIELD.INPUT,
    defaultValue: '',
    autoCapitalized: 'words',
    textContentType: 'givenName',
    rules: {required: 'Required'},
  },
  {
    name: 'lastName',
    label: 'Last Name',
    textContentType: 'familyName',
    type: 'Input',
    defaultValue: '',
    autoCapitalized: 'words',
    rules: {required: 'Required'},
  },
  {
    name: 'password',
    label: 'Password',
    textContentType: 'password',
    type: FORM_FIELD.INPUT,
    isPassword: true,
    defaultValue: '',
    rules: {
      required: 'Password required',
      pattern: {
        value:
          /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&\/=?_.,:;\\-])|(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])).{8,}$/,
        message:
          'minimal 8 characters, contains: UPPERCASE, lowercase, digits(0-9), special characters',
      },
    },
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    textContentType: 'telephoneNumber',
    keyboardType: 'phone-pad',
    type: FORM_FIELD.INPUT,
    defaultValue: '',
    affixLabel: '+62',
    rules: {required: 'Required'},
  },
  {
    name: 'terms',
    label: 'I agree to the Terms and our Policies',
    type: FORM_FIELD.CHECKBOX,
    defaultValue: false,
    rules: {required: 'Required'},
  },
];
