import React, {useState, useEffect} from 'react';
import Views from '@app/_modules/account_add_address/_view';
import {withProfiler} from '@sentry/react-native';
import {customUseQuery, customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {useMutation, useReactiveVar} from '@apollo/client';
import {ADD_ADDRESS} from '@app/_modules/account/services/schema';
import {useRefetchAddress} from '@app/hooks/useRefetchAddress';
import {useRefetchShipping} from '@app/hooks/useRefetchShipping';
import {rxCartId, rxAppSnackbar, rxUserType} from '@app/services/cache';
import {
  SET_BILLING_ADDRESS,
  SET_SHIPPING_ADDRESS,
} from '@app/_modules/cart/services/schema';
import {
  GET_CITY_LIST,
  GET_COUNTRY_LIST,
  GET_REGION_LIST,
  UPDATE_ADDRESS,
} from '@app/_modules/account/services/schema';

import _ from 'lodash';
import ErrorStackParser from '@root/node_modules/error-stack-parser/error-stack-parser';
/**
 * ---------------------------------------------------- *
 * @component AddAddressController
 * @param {Object} props
 * @summary Controller for Address Information screen
 * ---------------------------------------------------- *
 */

const Controller = ({navigation, route}) => {
  const param = _.get(route, 'params.addressData');
  const [loading, setLoading] = useState(false);

  const [modalLocation, setModalLocation] = useState({
    pinpoint: false,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    pinpoint: {
      longitude: '0',
      latitude: '0',
    },
    country: {},
    region: {},
    district: {},
    subdistrict: {},
    urbanVillage: {},
  });
  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [subdistrictList, setSubdistrictList] = useState([]);
  const [villageList, setVillageList] = useState([]);

  useEffect(() => {
    if (param) {
      getRegions({
        variables: {
          country_id: _.get(param, 'country_id'),
        },
      });
      const paramToState = {
        pinpoint: {
          longitude: _.get(param, 'custom_attributes[1].value'),
          latitude: _.get(param, 'custom_attributes[0].value'),
        },
        country: {full_name_locale: 'Indonesia', id: 'ID'},
        region: {},
        district: {},
        subdistrict: {},
        urbanVillage: {},
      };
      setSelectedLocation(paramToState);
    }
  }, []);

  const {data: countryData} = customUseQuery(GET_COUNTRY_LIST);

  const [getRegions, regionData] = customUseLazyQuery(GET_REGION_LIST);

  const [getCities, cityData] = customUseLazyQuery(GET_CITY_LIST);

  const userType = useReactiveVar(rxUserType);
  const cartId = useReactiveVar(rxCartId);

  const {refetch: refetchAddress} = useRefetchAddress();
  const {refetch: refetchShipping} = useRefetchShipping();

  const [updateAddressHook] = useMutation(UPDATE_ADDRESS);
  const [addAddressHook] = useMutation(ADD_ADDRESS);
  const [selectShippingAddressHook] = useMutation(SET_SHIPPING_ADDRESS);
  const [selectBillingAddressHook] = useMutation(SET_BILLING_ADDRESS);

  const onSelectShippingAddressGuest = async address => {
    const resShipping = await selectShippingAddressHook({
      variables: {
        input: {
          cart_id: cartId,
          shipping_addresses: [{address: address}],
        },
      },
    });

    const resBilling = await selectBillingAddressHook({
      variables: {
        input: {
          cart_id: cartId,
          billing_address: {address: address},
        },
      },
    });

    if (resShipping && resBilling) {
      await refetchShipping(resShipping.data.setShippingAddressesOnCart);
    }
  };

  const onSaveAddress = async data => {
    setLoading(true);
    if (userType === 'guest') {
      try {
        await onSelectShippingAddressGuest({
          city: data.district,
          country_code: _.get(selectedLocation, 'country.country_id'),
          firstname: data.firstName,
          lastname: data.lastName,
          street: data.streetAddress,
          postcode: data.postalCode,
          region_id: _.get(selectedLocation, 'region.region_id'),
          telephone: data.phoneNumber,
        });
        setLoading(false);
        navigation.goBack();
      } catch (err) {
        setLoading(false);
      }
    } else {
      try {
        const pinPointData = [
          {
            attribute_code: 'latitude',
            value: _.get(selectedLocation, 'pinpoint.latitude'),
          },
          {
            attribute_code: 'longitude',
            value: _.get(selectedLocation, 'pinpoint.longitude'),
          },
        ];

        if (param) {
          const res = await updateAddressHook({
            variables: {
              id: param.addressId,
              city: data.district,
              country_code: _.get(selectedLocation, 'country.country_id'),
              firstname: data.firstName,
              lastname: data.lastName,
              street: data.streetAddress,
              postcode: data.postalCode,
              region: data.region,
              region_code: _.get(selectedLocation, 'region.code'),
              region_id: _.get(selectedLocation, 'region.region_id'),
              telephone: data.phoneNumber,
              default_billing: data.defaultBilling,
              default_shipping: data.defaultShipping,
              custom_attributes: pinPointData,
            },
          });
          const customerAddress = _.get(res, 'data.updateCustomerAddress');
          if (customerAddress) {
            await refetchAddress(customerAddress);
            await refetchShipping();
            setLoading(false);
            navigation.goBack();
          } else {
            rxAppSnackbar({message: 'Something went wrong'});

            setLoading(false);
          }
        }

        if (!param) {
          const res = await addAddressHook({
            variables: {
              city: data.district,
              country_code: _.get(selectedLocation, 'country.country_id'),
              firstname: data.firstName,
              lastname: data.lastName,
              street: data.streetAddress,
              postcode: data.postalCode,
              region: data.region,
              region_code: _.get(selectedLocation, 'region.code'),
              region_id: _.get(selectedLocation, 'region.region_id'),
              telephone: data.phoneNumber,
              default_billing: data.defaultBilling,
              default_shipping: data.defaultShipping,
              custom_attributes: pinPointData,
            },
          });

          const customerAddress = _.get(res, 'data.createCustomerAddress');
          if (customerAddress) {
            await refetchAddress(customerAddress);
            await refetchShipping();
            setLoading(false);
            navigation.goBack();
          } else {
            rxAppSnackbar({message: 'Something went wrong'});

            setLoading(false);
          }
        }
      } catch (err) {
        rxAppSnackbar({message: ErrorStackParser.graphQLErrors[0].message});
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (countryData) {
      const {full_name_locale, id} = countryData.country;
      let countryListTmp = [
        {
          name: full_name_locale,
          country_id: id,
        },
      ];
      setCountryList(countryListTmp);
      setLoading(false);
    }
  }, [countryData]);

  useEffect(() => {
    const regions = _.get(regionData, 'data.getRegions.item');
    if (regions) {
      setRegionList(regions);
    }
    setLoading(false);
  }, [regionData]);

  useEffect(() => {
    const cities = _.get(cityData, 'data.getCityByRegionId.item');

    if (cities) {
      const tempCities = cities.map(item => {
        const name = _.split(item.city, ', ');
        if (name[0]) {
          return {
            ...item,
            name: name[0],
          };
        }
      });

      const uniqCities = _.uniqBy(tempCities, 'name');

      setCityList(uniqCities);
      setLoading(false);
    }
  }, [cityData]);

  useEffect(() => {
    const cities = _.get(cityData, 'data.getCityByRegionId.item');
    const selectedDistrict = _.get(selectedLocation, 'district.name');
    if (selectedDistrict) {
      const tempSubdistrict = _.filter(cities, item =>
        _.includes(item.city, selectedDistrict),
      ).map(item => {
        const name = _.split(item.city, ', ');
        if (name[1]) {
          return {...item, name: name[1]};
        }
      });

      const uniqSubdistrict = _.uniqBy(tempSubdistrict, 'name');

      setSubdistrictList(uniqSubdistrict);
      setLoading(false);
    }
  }, [selectedLocation.district]);

  useEffect(() => {
    const cities = _.get(cityData, 'data.getCityByRegionId.item');
    const selSubdistrict = _.get(selectedLocation, 'subdistrict.name');
    if (selSubdistrict) {
      const tempVillages = _.filter(cities, item =>
        _.includes(item.city, selSubdistrict),
      ).map(item => {
        const name = _.split(item.city, ', ');
        if (name[2]) {
          return {...item, name: name[2]};
        }
      });

      const uniqVillage = _.uniqBy(tempVillages, 'name');

      setVillageList(uniqVillage);
      setLoading(false);
    }
  }, [selectedLocation.subdistrict]);

  const onModalClose = modalName => {
    const valModal = _.set(modalName, modalName, false);
    setModalLocation(valModal);
  };

  const onModalOpen = modalName => {
    const valModal = _.set({...modalName}, modalName, true);
    setModalLocation(valModal);
  };

  const onSetPinPoint = val => {
    const valPinPoint = _.set({...selectedLocation}, 'pinpoint', val);
    setSelectedLocation(valPinPoint);
    onModalClose('pinpoint');
  };

  const onSelectLocation = ({selected, fieldName}) => {
    setLoading(true);
    const valList = _.set({...selectedLocation}, fieldName, selected);
    if (fieldName === 'country') {
      setCityList([]);
      setRegionList([]);
      setSubdistrictList([]);
      setVillageList([]);
      getRegions({
        variables: {
          country_id: selected.country_id,
        },
      });
    }
    if (fieldName === 'region') {
      setCityList([]);
      setSubdistrictList([]);
      setVillageList([]);
      getCities({
        variables: {
          region_id: selected.region_id,
        },
      });
    }
    if (fieldName === 'district') {
      setSubdistrictList([]);
      setVillageList([]);
    }
    if (fieldName === 'subdistrict') {
      setVillageList([]);
    }
    if (fieldName === 'urbanVillage') {
      setLoading(false);
    }
    setSelectedLocation(valList);
  };

  return (
    <Views
      isEdit={param}
      onSetPinPoint={onSetPinPoint}
      onModalOpen={onModalOpen}
      onModalClose={onModalClose}
      onSelectLocation={onSelectLocation}
      countryList={countryList}
      regionList={regionList}
      cityList={cityList}
      subdistrictList={subdistrictList}
      villageList={villageList}
      modalLocation={modalLocation}
      selectedLocation={selectedLocation}
      onSaveAddress={onSaveAddress}
      loading={loading}
    />
  );
};

export default withProfiler(Controller, {
  name: 'AddAddressController',
});
