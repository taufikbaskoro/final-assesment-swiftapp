import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {normalize} from '@app/styles/mixins';
import {DELETE_ADDRESS} from '@app/_modules/account/services/schema';
import {useRefetchAddress} from '@app/hooks/useRefetchAddress';

import Section from '@app/components/Section';
import Text from '@app/components/Text';

const DeleteAddressButton = ({addressId, styleProp = {}}) => {
  const [loading, setLoading] = useState(false);

  const [deleteAddressHook] = useMutation(DELETE_ADDRESS);
  const {refetch} = useRefetchAddress();

  const onDeleteAddress = async () => {
    try {
      setLoading(true);
      await deleteAddressHook({
        variables: {
          id: addressId,
        },
      });
      await refetch();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Section
          onPress={onDeleteAddress}
          border
          radius
          hpadding
          vpadding={normalize(3)}
          style={[styleProp]}>
          <Text small>Del</Text>
        </Section>
      )}
    </>
  );
};

export default withProfiler(DeleteAddressButton, {name: 'DeleteAddessButton'});
