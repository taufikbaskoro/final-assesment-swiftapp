import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import {UPDATE_ADDRESS} from '@app/_modules/account/services/schema';
import {useMutation} from '@apollo/client';
import {invalidPhone, invalidZip} from '@app/helpers/Validation';
import {useRefetchAddress} from '@app/hooks/useRefetchAddress';
import {useRefetchShipping} from '@app/hooks/useRefetchShipping';
import {useTextInputValidator} from '@app/hooks/useTextInputValidator';
import {rxAppSnackbar} from '@app/services/cache';

import AddressForm from '@app/components/AddressForm';

const UpdateAddress = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const [addressId, setAddressId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [countryId, setCountryId] = useState('ID');
  const [regionName, setRegionName] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [regionId, setRegionId] = useState(null);
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({
    longitude: '0',
    latitude: '0',
  });
  const [postCode, setPostCode] = useState('');
  const [telephone, setTelephone] = useState('');
  const [defaultBilling, setDefaultBilling] = useState(false);
  const [defaultShipping, setDefaultShipping] = useState(false);

  const [formError, validateTextInput] = useTextInputValidator();

  useEffect(() => {
    if (route.params.addressData) {
      const address = route.params.addressData;
      setAddressId(address.addressId);
      setFirstName(address.firstname);
      setLastName(address.lastname);
      setStreet(address.street);
      setCountryId(address.country_id);
      setRegionName(address.region);
      setRegionCode(address.region_code);
      setRegionId(address.region_id);
      setCity(address.city);
      setPostCode(address.postcode);
      setTelephone(address.telephone);
      setDefaultBilling(address.default_billing);
      setDefaultShipping(address.default_shipping);
      setLocation({
        latitude: parseFloat(address.custom_attributes[0].value),
        longitude: parseFloat(address.custom_attributes[1].value),
      });
    }
  }, [route]);

  const onSetPhone = text => {
    validateTextInput(
      text,
      'phone',
      setTelephone,
      invalidPhone,
      'Invalid Phone',
    );
  };

  const onSetPostCode = text => {
    validateTextInput(
      text,
      'postCode',
      setPostCode,
      invalidZip,
      'Invalid Post Code',
    );
  };

  const [updateAddressHook] = useMutation(UPDATE_ADDRESS);
  const {refetch: refetchAddress} = useRefetchAddress();
  const {refetch: refetchShipping} = useRefetchShipping();

  const onSaveAddress = async () => {
    let convertedStreet = street.split('\n').join(' ');
    try {
      setLoading(true);
      const postLocation = [
        {
          attribute_code: 'latitude',
          value: location.latitude,
        },
        {
          attribute_code: 'longitude',
          value: location.longitude,
        },
      ];
      const res = await updateAddressHook({
        variables: {
          id: addressId,
          city: city,
          country_id: countryId,
          firstname: firstName,
          lastname: lastName,
          street: convertedStreet,
          postcode: postCode,
          region: regionName,
          region_code: regionCode,
          region_id: regionId,
          telephone: telephone,
          default_billing: defaultBilling,
          default_shipping: defaultShipping,
          custom_attributes: postLocation,
        },
      });
      await refetchAddress(res.data.updateCustomerAddress);
      await refetchShipping();
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      rxAppSnackbar({message: error.graphQLErrors[0].message});
      setLoading(false);
    }
  };

  return (
    <AddressForm
      loading={loading}
      onSaveAddress={onSaveAddress}
      formError={formError}
      //
      firstName={firstName}
      onSetFirstname={setFirstName}
      lastName={lastName}
      onSetLastName={setLastName}
      street={street}
      onSetStreet={setStreet}
      countryId={countryId}
      onSetCountryId={setCountryId}
      regionName={regionName}
      onSetRegionName={setRegionName}
      regionId={regionId}
      onSetRegionId={setRegionId}
      regionCode={regionCode}
      onSetRegionCode={setRegionCode}
      city={city}
      onSetCity={setCity}
      location={location}
      setLocation={setLocation}
      postCode={postCode}
      onSetPostCode={onSetPostCode}
      telephone={telephone}
      onSetTelephone={onSetPhone}
      defaultBilling={defaultBilling}
      onSetDefaultBilling={() => setDefaultBilling(!defaultBilling)}
      defaultShipping={defaultShipping}
      onSetDefaultShipping={() => setDefaultShipping(!defaultShipping)}
      //
    />
  );
};

export default withProfiler(UpdateAddress, {name: 'UpdateAddress'});
