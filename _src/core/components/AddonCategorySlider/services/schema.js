import {gql} from '@apollo/client';

export const GET_CATEGORIES = gql`
  {
    categoryList {
      children_count
      category_icon
      children {
        id
        category_icon
        level
        name
        path
        url_path
        url_key
        image_path
        include_in_menu
        children {
          id
          category_icon
          level
          name
          path
          url_path
          url_key
          children {
            id
            category_icon
            level
            name
            path
            url_path
            url_key
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES_PARENTS = gql`
  {
    categoryList {
      children_count
      category_icon
      children {
        id
        category_icon
        level
        name
        path
        url_path
        url_key
        image_path
        include_in_menu
      }
    }
  }
`;

export const GET_CATEGORIES_BY_ID = gql`
  query category($id: Int!) {
    category(id: $id) {
      children_count
      children {
        id
        category_icon
        level
        name
        path
        url_path
        url_key
        image
        image_path
      }
    }
  }
`;
