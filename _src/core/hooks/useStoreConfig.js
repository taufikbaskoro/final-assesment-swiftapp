import {useEffect, useState} from 'react';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {GET_STORE_CONFIG} from '@app/services/queries/config';

export function useStoreConfig() {
  const [storeConfig, setStoreConfig] = useState(null);
  const {data: storeConfigData} = customUseQuery(GET_STORE_CONFIG);

  useEffect(() => {
    if (storeConfigData) {
      const config = JSON.stringify(storeConfigData)
        .replace(/\\n/g, '')
        .replace(/\\r/g, '')
        .replace(/\\t/g, '');
      setStoreConfig(JSON.parse(config).storeConfig);
    }
  }, [storeConfigData]);

  return [storeConfig];
}
