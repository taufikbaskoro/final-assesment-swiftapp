import {gql} from '@apollo/client';

export const GET_POPULAR_PRODUCTS = gql`
  query {
    categoryList(filters: {name: {match: "Best Seller"}}) {
      name
      products {
        items {
          name
          image {
            url
          }
          price_range {
            maximum_price {
              final_price {
                value
                currency
              }
            }
          }
        }
      }
    }
  }
`;
