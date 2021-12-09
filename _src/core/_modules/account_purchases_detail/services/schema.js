import {gql} from '@apollo/client';

export const GET_CUSTOMER_ORDERS = gql`
  query customerOrders($pageSize: Int, $currentPage: Int) {
    customerOrders(pageSize: $pageSize, currentPage: $currentPage) {
      total_count
      items {
        order_number
        status_label
        created_at
      }
    }
  }
`;

export const GET_CUSTOMER_ORDER = gql`
  query getCustomerOrder($filters: OrderList) {
    ordersFilter(filters: $filters) {
      data {
        id
        order_number
        grand_total
        status
        status_label
        detail {
          status
          state
          subtotal
          subtotal_incl_tax
          grand_total
          global_currency_code
          discount_amount
          items {
            name
            price
            qty_ordered
          }
          billing_address {
            firstname
            lastname
            email
            country_id
            city
            postcode
            region
            street
            telephone
          }

          shipping_address {
            firstname
            lastname
            email
            country_id
            city
            postcode
            region
            street
            telephone
          }
          shipping_methods {
            shipping_description
            track_number
            shipping_detail {
              data_detail
              __typename
            }
            __typename
          }
          payment {
            additional_information
            payment_additional_info {
              virtual_account
              due_date
              method_title
              transaction_id
              transaction_time
              __typename
            }
            additional_information
            shipping_amount
            shipping_captured
            __typename
          }
          coupon {
            is_use_coupon
            code
            rule_name
          }
          aw_rma {
            status
          }
          aw_store_credit {
            is_use_store_credit
            store_credit_amount
            store_credit_refunded
            store_credit_reimbursed
          }
        }
      }
    }
  }
`;

export const GET_FORM_DATA_RMA = gql`
  query getNewFormDataAwRma($email: String!, $order_number: String!) {
    getNewFormDataAwRma(email: $email, order_number: $order_number) {
      allowed_file_extensions
      custom_fields {
        id
        frontend_labels {
          store_id
          value
        }
        is_editable
        is_required
        name
        refers
        website_ids
        options {
          frontend_labels {
            store_id
            value
          }
          id
        }
      }
      items {
        is_returnable
        item_id
        name
        other_rma_request
        price
        qty_returnable
        sku
        image_url
        parent_item_id
        url_key
      }
    }
  }
`;
