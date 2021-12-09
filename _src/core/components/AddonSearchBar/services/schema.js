import {gql} from '@apollo/client';

export const SEARCH_PRODUCTS = gql`
  query searchProducts(
    $search: String
    $currentPage: Int
    $pageSize: Int
    $sortBy: ProductAttributeSortInput
  ) {
    products(
      search: $search
      currentPage: $currentPage
      pageSize: $pageSize
      sort: $sortBy
    ) {
      total_count
      items {
        id
        name
        sku
        url_key
        small_image {
          url
          label
        }
        price_range {
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
      }
      page_info {
        current_page
        total_pages
        page_size
      }
    }
  }
`;
