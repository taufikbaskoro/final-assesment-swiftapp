import {gql} from '@apollo/client';
export const UPDATE_ACCOUNT_INFORMATION = gql`
  mutation updateCustomer(
    $firstname: String
    $lastname: String
    $email: String
  ) {
    updateCustomer(
      input: {firstname: $firstname, lastname: $lastname, email: $email}
    ) {
      customer {
        email
        firstname
        lastname
      }
    }
  }
`;
