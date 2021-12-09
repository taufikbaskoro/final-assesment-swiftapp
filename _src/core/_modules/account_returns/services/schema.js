import {gql} from '@apollo/client';

export const GET_RETURN_CMS = gql`
  {
    cmsPage(identifier: "return-exchange") {
      content
      title
    }
  }
`;
