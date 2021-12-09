import {gql} from '@apollo/client';

export const GET_GIFT_CARD_ACCOUNT = gql`
  query giftCardAccount($giftCardCode: String!) {
    giftCardAccount(input: {gift_card_code: $giftCardCode}) {
      balance
      code
      expiration_date
      initial_balance
    }
  }
`;
