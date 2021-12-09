/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import {FORM_FIELD} from '@app/helpers/Constants';

/**
 * @constant {Array} formSchema
 * @summary use as Sign in form fields
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
];
