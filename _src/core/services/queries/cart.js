import gql from 'graphql-tag';

export const CREATE_EMPTY_CART = gql`
  mutation createEmptyCart {
    createEmptyCart
  }
`;

export const MERGE_CARTS = gql`
  mutation mergeCarts($source_cart_id: String!, $destination_cart_id: String!) {
    mergeCarts(
      source_cart_id: $source_cart_id
      destination_cart_id: $destination_cart_id
    ) {
      id
    }
  }
`;
