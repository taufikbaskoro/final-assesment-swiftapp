import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation createCustomerCustom(
    $email: String
    $password: String
    $firstname: String
    $lastname: String
    $otp: String
    $phonenumber: String
  ) {
    createCustomerCustom(
      input: {
        email: $email
        password: $password
        firstname: $firstname
        lastname: $lastname
        phonenumber: $phonenumber
        otp: $otp
      }
    ) {
      token
    }
  }
`;

export const REQUEST_OTP = gql`
  mutation requestOtpRegister($phonenumber: String!) {
    requestOtpRegister(phonenumber: $phonenumber) {
      info
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation checkOtpRegister($phonenumber: String!, $otp: String!) {
    checkOtpRegister(phonenumber: $phonenumber, otp: $otp) {
      is_valid_otp
    }
  }
`;
