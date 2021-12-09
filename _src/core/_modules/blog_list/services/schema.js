import {gql} from '@apollo/client';
export const GET_BLOG_BY_FILTER = gql`
  query getBlogByFilter($categoryId: Int, $pageSize: Int, $currentPage: Int) {
    getBlogByFilter(
      filters: {category_id: $categoryId}
      page_size: $pageSize
      current_page: $currentPage
    ) {
      page_size
      total_count
      total_pages
      current_page
      items {
        __typename
        title
        featured_image_url
        tag_names
        url_key
        id
        short_content
        category_ids
        created_at
      }
    }
  }
`;

export const GET_BLOG_CATEGORY = gql`
  {
    getBlogCategory {
      __typename
      data {
        id
        name
      }
    }
  }
`;
