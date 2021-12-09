import {useReactiveVar} from '@apollo/client';
import {useEffect, useState, useMemo} from 'react';
import {customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {GET_USER_DATA} from '@app/services/queries/user';
import {useSelectShippingAddress} from '@app/hooks/useSelectShippingAddress';
import {
  rxUserStoreCredit,
  rxUserInformation,
  rxUserAddresses,
} from '@app/services/cache';
import {parseAddress, isNewAddress} from '@app/helpers/Address';

export function useRefetchAddress() {
  const currentAddressState = useReactiveVar(rxUserAddresses);
  const [userDataParams, setUserDataParams] = useState(null);
  const [loadUserData, userData] = customUseLazyQuery(GET_USER_DATA);
  const userDataState = useMemo(() => {
    if (userDataParams) {
      return userDataParams;
    }
    if (userData?.data) {
      return userData.data;
    }
    return null;
  }, [userDataParams, userData]);

  const refetch = async userDataParam => {
    if (userDataParam) {
      setUserDataParams(userDataParam);
    } else {
      try {
        await loadUserData();
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const {setDefautShippingToCart, setDefautBillingToCart} =
    useSelectShippingAddress();

  useEffect(() => {
    if (userDataState && userDataState?.customer) {
      // user information
      if (userDataState.customer.firstname) {
        const {firstname, lastname, email} = userDataState.customer;
        const accountInformationState = {
          __typename: 'AccountInformation',
          firstname,
          lastname,
          email,
        };
        rxUserInformation(accountInformationState);
      }

      // store credit
      if (userDataState.customer.store_credit) {
        const {store_credit} = userDataState.customer;
        const storeCreditState = {
          __typename: 'StoreCredit',
          ...store_credit,
        };
        rxUserStoreCredit(storeCreditState);
      }

      // addresses
      if (userDataState.customer.addresses) {
        const {addresses} = userDataState.customer;
        addresses.map(async item => {
          const {default_billing, default_shipping, id} = item;
          if (default_shipping) {
            await setDefautShippingToCart(id);
          }

          if (default_billing) {
            await setDefautBillingToCart(id);
          }
        });

        const parsedAddresses = parseAddress(addresses);
        rxUserAddresses(parsedAddresses);
      }
    } else if (userDataState && userDataState?.id) {
      const {default_billing, default_shipping, id} = userDataState;
      let currentAddresses = [...currentAddressState];

      if (isNewAddress(currentAddresses, id)) {
        currentAddresses = [
          ...currentAddresses,
          ...parseAddress([userDataState]),
        ];
      } else {
        currentAddresses = currentAddresses.map(address => {
          if (address.addressId === userDataState.id) {
            return parseAddress([userDataState])[0];
          } else {
            return address;
          }
        });
      }

      rxUserAddresses(currentAddresses);

      if (default_shipping) {
        currentAddresses.map(address => {
          address.default_shipping = false;
        });
        setDefautShippingToCart(id);
      }
      if (default_billing) {
        currentAddresses.map(address => {
          address.default_billing = false;
        });
        setDefautBillingToCart(id);
      }
    }
  }, [userDataState]);

  return {refetch};
}
