import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  {
    categoryList {
      children {
        id
        url_key
        children {
          id
          url_key
          children {
            id
            url_key
          }
        }
      }
    }
  }
`;
