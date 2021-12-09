import React, {useState} from 'react';
import {useMutation, useReactiveVar} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {ADD_ADDRESS} from '@app/_modules/account/services/schema';
import {invalidPhone, invalidZip} from '@app/helpers/Validation';
import {useRefetchAddress} from '@app/hooks/useRefetchAddress';
import {useRefetchShipping} from '@app/hooks/useRefetchShipping';
import {useTextInputValidator} from '@app/hooks/useTextInputValidator';
import {rxCartId, rxAppSnackbar, rxUserType} from '@app/services/cache';
import {
  SET_BILLING_ADDRESS,
  SET_SHIPPING_ADDRESS,
} from '@app/_modules/cart/services/schema';

import AddressForm from '@app/components/AddressForm';

const AddAddress = ({navigation}) => {
  const userType = useReactiveVar(rxUserType);
  const cartId = useReactiveVar(rxCartId);

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [countryId, setCountryId] = useState('ID');
  const [regionName, setRegionName] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [regionId, setRegionId] = useState(null);
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [telephone, setTelephone] = useState('');
  const [location, setLocation] = useState({
    longitude: '0',
    latitude: '0',
  });
  const [defaultBilling, setDefaultBilling] = useState(false);
  const [defaultShipping, setDefaultShipping] = useState(false);

  const [formError, validateTextInput] = useTextInputValidator();

  const {refetch: refetchAddress} = useRefetchAddress();
  const {refetch: refetchShipping} = useRefetchShipping();

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
  // End of TODO

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

  const onSaveAddress = async () => {
    let convertedStreet = street.split('\n').join(' ');
    if (userType === 'guest') {
      try {
        setLoading(true);
        await onSelectShippingAddressGuest({
          city: city,
          country_code: countryId,
          firstname: firstName,
          lastname: lastName,
          street: convertedStreet,
          postcode: postCode,
          region_id: regionId,
          telephone: telephone,
        });
        setLoading(false);
        navigation.goBack();
      } catch (error) {
        console.log('HERE', error);
        setLoading(false);
      }
    } else {
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
        const res = await addAddressHook({
          variables: {
            city: city,
            country_code: countryId,
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
        await refetchAddress(res.data.createCustomerAddress);
        await refetchShipping();
        setLoading(false);
        navigation.goBack();
      } catch (error) {
        rxAppSnackbar({message: error.graphQLErrors[0].message});
        setLoading(false);
      }
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
    />
  );
};

export default withProfiler(AddAddress, {name: 'AddAddress'});
