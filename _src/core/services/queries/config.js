import gql from 'graphql-tag';

export const GET_CORE_CONFIG = gql`
  query getCoreConfig($path: String!, $key: String!) {
    getCoreConfig(path: $path, key: $key) {
      code
      status
      message
      data {
        core_name
        core_value
      }
    }
  }
`;

export const GET_STORE_CONFIG = gql`
  query {
    storeConfig {
      shipments_configuration
      payments_configuration
    }
  }
`;
