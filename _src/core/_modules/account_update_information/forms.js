/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import {FORM_FIELD} from '@app/helpers/Constants';

/**
 * @constant {Array} formSchema
 * @summary use as Sign in form fields
 */
export const formSchema = ({email, firstName, lastName}) => [
  {
    name: 'email',
    label: 'Email',
    textContentType: 'emailAddress',
    type: FORM_FIELD.INPUT,
    defaultValue: email || '',
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
    defaultValue: firstName || '',
    autoCapitalized: 'words',
    textContentType: 'givenName',
    rules: {required: 'Required'},
  },
  {
    name: 'lastName',
    label: 'Last Name',
    textContentType: 'familyName',
    type: 'Input',
    defaultValue: lastName || '',
    autoCapitalized: 'words',
    rules: {required: 'Required'},
  },
];
