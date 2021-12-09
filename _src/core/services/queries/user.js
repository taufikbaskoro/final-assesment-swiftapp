import gql from 'graphql-tag';

export const GET_USER_DATA = gql`
  query customer {
    customer {
      phonenumber
      firstname
      lastname
      group_id
      date_of_birth
      addresses {
        id
        region {
          region
          region_code
          region_id
        }
        country_code
        country_id
        firstname
        lastname
        street
        company
        telephone
        postcode
        city
        vat_id
        default_billing
        default_shipping
        custom_attributes {
          attribute_code
          value
        }
      }
      created_at
      default_billing
      default_shipping
      email
      is_subscribed
      taxvat
      store_credit {
        enabled
        current_balance {
          value
          currency
        }
      }
    }
  }
`;

export const GET_USER_WISHLIST = gql`
  query customer {
    customer {
      wishlist {
        items_count
        items {
          id
          added_at
          product {
            id
            name
            sku
            price_range {
              maximum_price {
                regular_price {
                  currency
                  value
                }
                final_price {
                  currency
                  value
                }
                discount {
                  amount_off
                  percent_off
                }
              }
            }
            price_tiers {
              final_price {
                value
                currency
              }
              discount {
                amount_off
                percent_off
              }
              quantity
            }
            thumbnail {
              url
              label
            }
            url_key
          }
        }
      }
    }
  }
`;
