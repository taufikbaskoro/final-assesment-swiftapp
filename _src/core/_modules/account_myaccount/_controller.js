import React, {useEffect, useState} from 'react';
import {useReactiveVar} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';
import {
  rxUserInformation,
  rxUserAddresses,
  rxAppSnackbar,
} from '@app/services/cache';
import {useMutation} from '@apollo/client';
import {useRefetchAddress} from '@app/hooks/useRefetchAddress';
import {withProfiler} from '@sentry/react-native';
import {navigateTo} from '@app/helpers/Navigation';
import {DELETE_ADDRESS} from '@app/_modules/account/services/schema';

import Views from '@app/_modules/account_myaccount/_view';
import * as Sentry from '@sentry/react-native';

import {modules} from '@root/swift.config';

const MyAccount = props => {
  if (!modules.account_myaccount.enable) {
    return null;
  }

  const [deleteAddressHook] = useMutation(DELETE_ADDRESS);
  const {refetch} = useRefetchAddress();

  const isFocused = useIsFocused();
  const accountInformation = useReactiveVar(rxUserInformation);
  const addressClientData = useReactiveVar(rxUserAddresses);
  const [addresses, setAddressData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      if (addressClientData) {
        setAddressData(addressClientData);
      }

      // Tracing with email as extra data
      const transaction = Sentry.startTransaction({
        name: accountInformation.firstName,
        email: accountInformation.email,
      });
      const span = transaction.startChild({op: 'functionX'}); // This function returns a Span
      // functionCallX
      span.finish(); // Remember that only finished spans will be sent with the transaction
      transaction.finish(); // Finishing the transaction will send it to Sentry
      //
    }
  }, [isFocused]);

  const onNavigateToAddAddress = () => {
    navigateTo(
      modules.account_address_add.enable,
      modules.account_address_add.name,
    );
  };
  const onNavigateToUpdateAddress = addressData => {
    navigateTo(
      modules.account_address_add.enable,
      modules.account_address_add.name,
      {
        addressData,
      },
    );
  };

  const onNavigateToUpdateAccountInformation = accountInformationData => {
    navigateTo(
      modules.account_update_information.enable,
      modules.account_update_information.name,
      {accountInformationData},
    );
  };

  const onDeleteAddress = async addressId => {
    try {
      const res = await deleteAddressHook({
        variables: {
          id: addressId,
        },
      });
      if (res) {
        rxAppSnackbar({message: 'Address deleted'});
        await refetch();
      }
    } catch (error) {
      rxAppSnackbar({message: 'Something went wrong'});
    }
  };

  /**
   * [props] set controller props
   * @return {object}
   */
  const controllerProps = {
    accountInformation,
    addresses,
    onNavigateToAddAddress,
    onNavigateToUpdateAddress,
    onNavigateToUpdateAccountInformation,
    onDeleteAddress,
  };

  return <Views {...props} {...controllerProps} />;
};

export default withProfiler(MyAccount, {name: 'MyAccount'});
