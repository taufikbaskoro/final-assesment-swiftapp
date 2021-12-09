import {gql} from '@apollo/client';
export const CHANGE_PASSWORD = gql`
  mutation changeCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      email
    }
  }
`;
