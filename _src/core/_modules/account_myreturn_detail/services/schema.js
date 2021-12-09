import {gql} from '@apollo/client';

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
