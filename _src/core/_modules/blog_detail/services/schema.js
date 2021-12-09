import {gql} from '@apollo/client';
export const GET_BLOG_BY_ID = gql`
  query getBlogByFilter($blogId: Int) {
    getBlogByFilter(filters: {id: $blogId}) {
      page_size
      total_count
      total_pages
      current_page
      items {
        __typename
        title
        content
        featured_image_url
        tag_names
        url_key
        id
        category_ids
        created_at
      }
    }
  }
`;
