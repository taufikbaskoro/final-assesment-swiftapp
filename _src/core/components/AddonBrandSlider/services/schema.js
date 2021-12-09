import gql from 'graphql-tag';

export const GET_BRANDS = gql`
  {
    getBrandList {
      items {
        logo
        name
        attribute_id
      }
    }
  }
`;
