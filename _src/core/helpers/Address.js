export const isNewAddress = (currentAddressState, inputAddressId) => {
  let found = true;
  if (currentAddressState.length === 0) {
    return found;
  }
  currentAddressState.map(address => {
    if (address.addressId === inputAddressId) {
      found = false;
    }
  });
  return found;
};

export const parseAddress = addresses => {
  const addressState = [];
  addresses.map(async item => {
    const {
      city,
      country_id,
      default_billing,
      default_shipping,
      firstname,
      lastname,
      id,
      postcode,
      region,
      street,
      telephone,
      custom_attributes,
    } = item;
    const {region: regionName, region_code, region_id} = region;

    addressState.push({
      __typename: 'UserAddress',
      addressId: id,
      firstname,
      lastname,
      city,
      country_id,
      street: street[0],
      postcode,
      region: regionName,
      region_code,
      region_id,
      telephone,
      default_billing,
      default_shipping,
      custom_attributes,
    });
  });
  return addressState;
};
