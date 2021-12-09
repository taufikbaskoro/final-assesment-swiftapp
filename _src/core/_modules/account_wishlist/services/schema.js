import {gql} from '@apollo/client';

export const ADD_TO_WISHLIST = gql`
  mutation addWishlist($productId: Int!) {
    addProductToWishlist(productId: $productId) {
      info
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation removeWishlist($wishlistItemId: Int!) {
    removeItemWishlist(wishlistItemId: $wishlistItemId) {
      info
    }
  }
`;
