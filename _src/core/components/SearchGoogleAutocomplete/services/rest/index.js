import Config from 'react-native-config';
// import { Storage } from '@app/helpers/Storage';

export default {
  endpoint: {
    google_list_city: `${Config.GOOGLE_MAPS_API_PLACE}autocomplete/json?`,
    google_list_city_detail: `${Config.GOOGLE_MAPS_API_PLACE}details/json?`,
  },
  service: async ({method = 'GET', url, data}) => {
    let token;
    // if (Storage.name.AUTH_TOKEN !== undefined) token = await Storage.get(Storage.name.AUTH_TOKEN);

    const config = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (token !== undefined || token !== null) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    if (method === 'POST') {
      config.body = JSON.stringify(data);
    }

    return fetch(url, config).then(response => response.json());
  },
};
