import {gql} from '@apollo/client';

export const ADD_ADDRESS = gql`
  mutation createCustomerAddress(
    $city: String
    $country_code: CountryCodeEnum
    $default_billing: Boolean
    $default_shipping: Boolean
    $firstname: String
    $lastname: String
    $postcode: String
    $region: String
    $region_code: String
    $region_id: Int
    $street: [String]
    $telephone: String
    $custom_attributes: [CustomerAddressAttributeInput]
  ) {
    createCustomerAddress(
      input: {
        city: $city
        country_code: $country_code
        firstname: $firstname
        lastname: $lastname
        postcode: $postcode
        default_billing: $default_billing
        default_shipping: $default_shipping
        region: {
          region: $region
          region_code: $region_code
          region_id: $region_id
        }
        telephone: $telephone
        street: $street
        custom_attributes: $custom_attributes
      }
    ) {
      id
      region {
        region
        region_code
      }
      region_id
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
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation updateCustomerAddress(
    $id: Int!
    $city: String
    $country_id: CountryCodeEnum
    $firstname: String
    $lastname: String
    $postcode: String
    $region: String
    $region_code: String
    $region_id: Int
    $telephone: String
    $street: [String]
    $default_billing: Boolean
    $default_shipping: Boolean
    $custom_attributes: [CustomerAddressAttributeInput]
  ) {
    updateCustomerAddress(
      id: $id
      input: {
        city: $city
        country_id: $country_id
        firstname: $firstname
        lastname: $lastname
        postcode: $postcode
        default_billing: $default_billing
        default_shipping: $default_shipping
        region: {
          region: $region
          region_code: $region_code
          region_id: $region_id
        }
        telephone: $telephone
        street: $street
        custom_attributes: $custom_attributes
      }
    ) {
      id
      region {
        region
        region_code
      }
      region_id
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
  }
`;

export const DELETE_ADDRESS = gql`
  mutation deleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;

export const GET_REGION_LIST = gql`
  query getRegions($country_id: String) {
    getRegions(country_id: $country_id) {
      item {
        region_id
        country_id
        code
        name
      }
    }
  }
`;

export const GET_CITY_LIST = gql`
  query getCityByRegionId($region_id: Int!) {
    getCityByRegionId(region_id: $region_id) {
      item {
        city
        region_id
        region_code
        postcode
      }
    }
  }
`;

export const GET_COUNTRY_LIST = gql`
  {
    country(id: "ID") {
      id
      full_name_locale
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

export const CREATE_REQUEST_RMA = gql`
  mutation createRequestAwRma(
    $order_number: String!
    $customer_email: String!
    $customer_name: String!
    $custom_fields: [AwRmaCustomFieldInput]!
    $order_items: [AwRmaOrderItemsInput]!
    $thread_message: AwRmaThreadMessageInput
  ) {
    createRequestAwRma(
      input: {
        order_number: $order_number
        customer_name: $customer_name
        customer_email: $customer_email
        custom_fields: $custom_fields
        order_items: $order_items
        thread_message: $thread_message
      }
    ) {
      detail_rma {
        id
        increment_id
        order_id
        order_number
        status {
          name
          id
        }
      }
    }
  }
`;

export const GET_CUSTOMER_REQUESTS = gql`
  query getHistoryRma($pageSize: Int, $currentPage: Int) {
    getCustomerRequestAwRma(page_size: $pageSize, current_page: $currentPage) {
      current_page
      page_size
      total_count
      total_pages
      items {
        id
        increment_id
        order_date
        order_number
        order_id
        items {
          name
        }
        status {
          id
          name
        }
      }
    }
  }
`;

const responseRma = `
detail_rma {
    id
    increment_id
    confirm_shipping {
      status
      step
      print_label_url
    }
    order_number
    order_date
    status {
        name
    }
    customer_address {
      firstname
      lastname
      telephone
      street
      city
      region
      postcode
      suffix
      vat_id
      fax 
      
    }
    custom_fields {
      field {
        frontend_labels {
          value
        }
        id
      }
      value {
        id
        frontend_labels {
          value
        }
      }
    }
    items {
        name
        image_url
        id
        url_key
        item_id
        qty_rma 
        price
        sku
        custom_fields {
            field {
              id
              frontend_labels {
                value
              }
            }
            value {
              frontend_labels {
                value
              }
              id
            }
        }
    }
    thread_message {
        created_at
        owner_name
        owner_type
        is_auto
        is_internal
        id
        text
        attachments {
            file_name
            image_url
            name
          }
      }
  }
  form_data {
    allowed_file_extensions
    custom_fields {
      name
      frontend_labels {
        value
      }
      is_editable
      is_required
      type
      refers
      id
      options {
        id
        frontend_labels {
          value
        }
      }
    }
  }
`;

export const GET_UPDATE_FORM_RMA = gql`
query getUpdateFormRma(
    $email: String!,
    $increment_id: String!,
){
    getUpdateFormDataAwRma(email: $email, increment_id: $increment_id) {
      ${responseRma}
    }
  }
`;

export const UPDATE_REQUEST_RMA = gql`
  mutation updateRma(
    $custom_fields: [AwRmaCustomFieldInput]
    $customer_email: String!
    $increment_id: String!
    $order_items: [AwRmaOrderItemsInput]
    $print_label: AwRmaPrintLabelInput
    $update_status: Boolean
    $thread_message: AwRmaThreadMessageInput
  ) {
    updateRequestAwRma(
      input: {
        custom_fields: $custom_fields
        customer_email: $customer_email
        increment_id: $increment_id
        order_items: $order_items
        print_label: $print_label
        update_status: $update_status
        thread_message: $thread_message
      }
    ) {
      detail_rma {
        id
        increment_id
        order_id
        order_number
        status {
          name
          id
        }
      }
    }
  }
`;

export const CANCEL_REQUEST_RMA = gql`
mutation cancelRma(
  $email: String!,
  $increment_id: String!,
) {
  cancelRequestAwRma(input: {
    email:$email,
    increment_id: $increment_id
  }) {
    ${responseRma}
  }
}
`;
