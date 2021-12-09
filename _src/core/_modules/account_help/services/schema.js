import gql from 'graphql-tag';

export const GET_CUSTOMER_SERVICE_CMS = gql`
  {
    cmsPage(identifier: "customer-service") {
      content
      title
    }
  }
`;
