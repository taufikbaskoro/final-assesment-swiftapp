import {ApolloClient, createHttpLink, concat} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {Storage} from '@app/helpers/Storage';
import {cache} from '@app/services/cache';
import {apolloConfig} from '@root/swift.config';

import Config from 'react-native-config';
/**
 * query
 * @param {*} schema
 * @param {*} data
 * @param {*} opts
 *
 * @return {promise}
 */
export const query = async (schema, data = null, opts = null) => {
  let configClient = {query: schema};
  if (data !== null) {
    configClient.variables = data;
  }
  if (opts !== null) {
    configClient = {...configClient, ...opts};
  }
  return client.query(configClient);
};

/**
 * mutate
 * @param {*} schema
 * @param {*} data
 * @param {*} opts
 *
 * @return {promise}
 */
export const mutate = async (schema, data = null, opts = null) => {
  let configClient = {mutation: schema};
  if (data !== null) {
    configClient.variables = data;
  }
  if (opts !== null) {
    configClient = {...configClient, ...opts};
  }
  return client.mutate(configClient);
};

/**
 * ---------------------------------------------------- *
 * this setup for calling graphql
 * ---------------------------------------------------- *
 */
const uri = Config.GRAPHQL_BASE_URL;
const httpLink = createHttpLink({
  useGETForQueries: apolloConfig.method === 'GET',
  uri,
});
const authMiddleware = setContext(async (_, {request, headers}) => {
  const getAuthData = await Storage.get(Storage.name.TOKEN);
  const isTokenNull = getAuthData === null;
  const isAuthOff = request === 'auth-off';
  const token = isTokenNull ? '' : getAuthData;
  let headersData = {...headers, 'Content-Type': 'application/json'};
  if (!isTokenNull && !isAuthOff) {
    headersData.Authorization = token ? `Bearer ${token}` : '';
  }
  if (apolloConfig.console) {
    console.log('headers', getAuthData);
  }
  return {headers: headersData};
});

/**
 * ---------------------------------------------------- *
 * @instance of apollo client
 * @summary all middleware, httplink, etc.
 * ---------------------------------------------------- *
 */
const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

export default client;
