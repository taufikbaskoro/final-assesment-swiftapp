/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import {FORM_FIELD} from '@app/helpers/Constants';

/**
 * @constant {Array} formSchema
 * @summary use as Change password form fields
 */
export const formSchema = [
  {
    name: 'currentPassword',
    label: 'Current Password',
    textContentType: 'password',
    type: FORM_FIELD.INPUT,
    isPassword: true,
    defaultValue: '',
    rules: {
      required: 'Current password required',
      pattern: {
        value:
          /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&\/=?_.,:;\\-])|(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])).{8,}$/,
        message:
          'Password must be at least 8 characters and contains: \nUPPER CASE \nlower case \ndigits(0-9) or special characters(!@#$%&=?_.,:;-)',
      },
    },
  },
  {
    name: 'newPassword',
    label: 'New Password',
    textContentType: 'password',
    type: FORM_FIELD.INPUT,
    isPassword: true,
    defaultValue: '',
    rules: {
      required: 'New password required',
      pattern: {
        value:
          /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&\/=?_.,:;\\-])|(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])|(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&\/=?_.,:;\\-])).{8,}$/,
        message:
          'Password must be at least 8 characters and contains: \nUPPER CASE \nlower case \ndigits(0-9) or special characters(!@#$%&=?_.,:;-)',
      },
    },
  },
  {
    name: 'repeatPassword',
    label: 'Re-enter new password',
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
          'Password must be at least 8 characters and contains: \nUPPER CASE \nlower case \ndigits(0-9) or special characters(!@#$%&=?_.,:;-)',
      },
    },
  },
];
