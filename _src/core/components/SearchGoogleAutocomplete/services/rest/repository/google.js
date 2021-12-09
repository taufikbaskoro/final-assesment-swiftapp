import Config from 'react-native-config';
import Api from '@app/components/SearchGoogleAutocomplete/services/rest';

export const getListCity = input => {
  const params = `input=${input}&key=${Config.GOOGLE_MAPS_API_KEY}&type=geocode`;
  const url = Api.endpoint.google_list_city + params;
  return Api.service({method: 'GET', url});
};

export const getListCityDetail = place_id => {
  const params = `placeid=${place_id}&key=${Config.GOOGLE_MAPS_API_KEY}`;
  const url = Api.endpoint.google_list_city_detail + params;
  return Api.service({method: 'GET', url});
};
