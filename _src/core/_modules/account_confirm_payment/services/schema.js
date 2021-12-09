import gql from 'graphql-tag';

export const MUTATION_CONFIRM_PAYMENT = gql`
  mutation createConfirmPayment($input: ConfirmPaymentInput) {
    createConfirmPayment(input: $input) {
      success
    }
  }
`;
