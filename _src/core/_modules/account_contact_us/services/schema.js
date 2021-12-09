import gql from 'graphql-tag';

export const GET_CONTACT_CMS = gql`
  {
    cmsBlocks(identifiers: "contact-us-info") {
      items {
        content
        title
      }
    }
  }
`;
