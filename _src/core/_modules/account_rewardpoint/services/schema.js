import {gql} from '@apollo/client';

export const GET_CUSTOMER_REWARD_POINTS = gql`
  query customerRewardPoints($currentPage: Int, $pageSize: Int) {
    customerRewardPoints {
      balance
      balanceCurrency
      transaction_history(currentPage: $currentPage, pageSize: $pageSize) {
        items {
          transactionId
          transactionDate
          points
          comment
          balance
        }
        total_count
      }
    }
  }
`;
