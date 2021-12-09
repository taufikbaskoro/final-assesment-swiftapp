import gql from 'graphql-tag';

export const GET_ABOUT_CMS = gql`
  {
    cmsPage(identifier: "about-us") {
      content
      title
    }
  }
`;
