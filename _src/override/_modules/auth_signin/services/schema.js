import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation generateCustomerToken($userLogin: String!, $password: String!) {
    generateCustomerTokenCustom(username: $userLogin, password: $password) {
      token
    }
  }
`;
