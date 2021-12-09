import {FORM_FIELD} from '@app/helpers/Constants';

/**
 * @constant {Array} formSchema
 * @summary use as Add Address form fields
 */
export const formSchema = ({custom, defVal}) => [
  {
    name: 'firstName',
    label: 'First Name',
    type: FORM_FIELD.INPUT,
    defaultValue: defVal ? defVal.firstname : '',
    autoCapitalized: 'words',
    textContentType: 'givenName',
    rules: {required: 'Required'},
  },
  {
    name: 'lastName',
    label: 'Last Name',
    textContentType: 'familyName',
    type: FORM_FIELD.INPUT,
    defaultValue: defVal ? defVal.lastname : '',
    autoCapitalized: 'words',
    rules: {required: 'Required'},
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    textContentType: 'telephoneNumber',
    keyboardType: 'phone-pad',
    type: FORM_FIELD.INPUT,
    defaultValue: defVal ? defVal.telephone : '',
    affixLabel: '+62',
    rules: {required: 'Required'},
  },
  ...custom,
  {
    name: 'defaultBilling',
    label: 'Use as my default billing address',
    type: FORM_FIELD.CHECKBOX,
    defaultValue: defVal ? defVal.default_billing : false,
    rules: {},
  },
  {
    name: 'defaultShipping',
    label: 'Use as my default shipping address',
    type: FORM_FIELD.CHECKBOX,
    defaultValue: defVal ? defVal.default_shipping : false,
    rules: {},
  },
];
