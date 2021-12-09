import {useEffect, useState, useRef} from 'react';
import {useApolloClient} from '@apollo/client';

const useQueryCustom = ({
  schema,
  useInitData = false,
  variables = null,
  opts = null,
}) => {
  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const client = useApolloClient();
  const mount = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * ---------------------------------------------------- *
   * @dependency []
   * @summary {lifecycle}
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    mount.current = true;
    if (mount.current && useInitData) {
      onRefetchData();
    }
    return () => (mount.current = false);
  }, []);

  /**
   * ---------------------------------------------------- *
   * @function {onRefetchData}
   * @summary function use for get data
   * ---------------------------------------------------- *
   */
  const onRefetchData = async ({params = null}) => {
    try {
      setLoading(true);
      let config = {query: schema};
      if (variables !== null) {
        config.variables = variables;
      }
      if (params !== null) {
        config.variables = params;
      }
      if (opts !== null) {
        config = {...config, ...opts};
      }
      const res = await client.query(config);
      setData(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  /**
   * ---------------------------------------------------- *
   * @returns {object}
   * @summary hooks returning needed object
   * ---------------------------------------------------- *
   */
  return {loading, data, error, onRefetchData};
};

export default useQueryCustom;
