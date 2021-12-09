import React from 'react';
import AppBarComponent from '@app/components/AppBar';
import Text from '@app/components/Text';
import {ScrollView, View} from 'react-native';
import {Button, Card, Chip, Caption, useTheme} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';

import styles from '@app/_modules/account_myaccount/styles';

function MyAccountScreen({
  addresses,
  onNavigateToAddAddress,
  onNavigateToUpdateAddress,
  onDeleteAddress,
}) {
  const {colors} = useTheme();

  const ItemAddress = ({data}) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          width: '90%',
          marginVertical: 10,
          alignSelf: 'center',
        }}>
        {data &&
          data.map((address, index) => {
            const isHighlighted =
              address.default_billing || address.default_shipping;
            return (
              <Card
                key={'address-' + index}
                style={{
                  marginTop: 10,
                  width: '100%',
                  alignSelf: 'center',
                  borderBottomWidth: 2,
                  borderBottomColor: isHighlighted && 'green',
                }}>
                <Card.Content>
                  <Text xlarge bold>
                    {address.firstname} {address.lastname}
                  </Text>
                  <Caption>{address.telephone}</Caption>
                  <Text small style={{marginBottom: 10}}>
                    {address.street} {address.city} {address.region},{' '}
                    {address.postcode}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {address.default_billing && (
                      <Chip style={{marginRight: 5}} icon="currency-usd-circle">
                        Default Billing
                      </Chip>
                    )}
                    {address.default_shipping && (
                      <Chip icon="truck">Default Shipping</Chip>
                    )}
                  </View>
                </Card.Content>
                <Card.Actions style={{justifyContent: 'space-between'}}>
                  <Button
                    color={colors.placeholder}
                    onPress={() => onDeleteAddress(address.addressId)}>
                    Delete
                  </Button>
                  <Button onPress={() => onNavigateToUpdateAddress(address)}>
                    Edit
                  </Button>
                </Card.Actions>
              </Card>
            );
          })}
      </View>
    );
  };

  return (
    <>
      <AppBarComponent title={'Saved Address'} useBack />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.mainContainer}>
        <ItemAddress data={addresses} />
      </ScrollView>
      <Button
        style={{width: '90%', alignSelf: 'center', marginVertical: 20}}
        mode={'contained'}
        onPress={() => onNavigateToAddAddress()}>
        Add Address
      </Button>
    </>
  );
}

export default withProfiler(MyAccountScreen, {name: 'MyAccountScreen'});
