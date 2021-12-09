import {gql} from '@apollo/client';

export const GET_STORE_CREDIT_TRANSACTIONS = gql`
  query customer($currentPage: Int, $pageSize: Int) {
    customer {
      store_credit {
        current_balance {
          currency
          value
        }
        enabled
        transaction_history(currentPage: $currentPage, pageSize: $pageSize) {
          items {
            transaction_id
            transaction_date_time
            store_credit_balance {
              currency
              value
            }
            store_credit_adjustment {
              currency
              value
            }
            comment
            comment_placeholder
          }
          total_count
          page_info {
            current_page
            total_pages
            page_size
          }
        }
      }
    }
  }
`;
