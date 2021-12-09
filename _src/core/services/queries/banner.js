import gql from 'graphql-tag';

export const GET_BANNER_SLIDER = gql`
  {
    getHomepageSlider {
      images {
        image_url
        url_redirection
        image_id
      }
      slider_id
    }
  }
`;

export const GET_CATEGORYID_BYURL = gql`
  query getCategoryID($url: String) {
    categoryList(filters: {url_key: {eq: $url}}) {
      id
    }
  }
`;
