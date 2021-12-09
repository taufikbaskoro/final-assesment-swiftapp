import React, {useState} from 'react';
import {FlatList, Modal, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {useReactiveVar} from '@apollo/client';
import {rxCartIsVirtual} from '@app/services/cache';
import {normalize} from '@app/styles/mixins';
import {navigateTo} from '@app/helpers/Navigation';
import Button from '@app/components/Button';
import RadioButton from '@app/components/RadioButton';
import Section from '@app/components/Section';
// import Text from '@app/components/Text';

import styles from '@app/_modules/cart/atoms/ShippingAddressBlock/styles';
import {modules} from '@root/swift.config';

const ShippingAddressBlock = ({
  selectedShippingAddress,
  selectedBillingAddress,
  userAddresses,
  onSelectShippingAddress,
  shippingAddressLoading,
}) => {
  const cartIsVirtual = useReactiveVar(rxCartIsVirtual);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedStatus = item => {
    const address = cartIsVirtual
      ? selectedBillingAddress
      : selectedShippingAddress;
    if (
      address.firstname === item.firstname &&
      address.lastname === item.lastname &&
      address.street === item.street &&
      address.city === item.city &&
      address.region === item.region &&
      address.country_id === item.country_id &&
      address.telephone === item.telephone
    ) {
      return true;
    } else {
      return false;
    }
  };

  const UserAddressesModal = withProfiler(
    () => {
      return (
        <Modal
          visible={modalVisible}
          transparent
          onRequestClose={() => setModalVisible(false)}>
          <Section flex backgroundColor={'rgba(0, 0, 0, 0.6)'} />
          <View style={{width: '100%', display: 'flex'}}>
            <FlatList
              ListHeaderComponent={
                <Section row spaceBetween padding={15}>
                  <Text>Select Address</Text>
                  <Section onPress={() => setModalVisible(false)}>
                    <Text xlarge>x</Text>
                  </Section>
                </Section>
              }
              style={styles.listContainer}
              data={userAddresses}
              keyExtractor={item => item.addressId.toString()}
              renderItem={({item}) => {
                console.log(item, 'address');
                return (
                  <Section
                    onPress={() => {
                      onSelectShippingAddress(item);
                      setModalVisible(false);
                    }}
                    style={styles.itemContainer}>
                    <RadioButton
                      selected={
                        selectedShippingAddress || selectedBillingAddress
                          ? selectedStatus(item)
                          : false
                      }
                    />
                    <Section alignStart hmargin={15}>
                      <Text>
                        {item.firstname} {item.lastname}
                      </Text>
                      <Text>{item.street}</Text>
                      <Text>{item.city}</Text>
                      <Text>{item.region}</Text>
                      <Text>{item.telephone}</Text>
                    </Section>
                  </Section>
                );
              }}
              ListFooterComponent={
                <View padding={15}>
                  <Button
                    label="Add Shipping Address +"
                    styleProp={{
                      width: '100%',
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      navigateTo(
                        modules.account_address_add.enable,
                        modules.account_address_add.name,
                      );
                    }}
                  />
                </View>
              }
            />
          </View>
        </Modal>
      );
    },
    {name: 'UserAddressesModal'},
  );

  const SelectedAddressView = withProfiler(
    ({address}) => {
      return (
        <View style={styles.selectedAddressWrapper}>
          <View style={styles.selectedAddressTitle}>
            <Text style={styles.selectedAddressTitleLabel}>
              {cartIsVirtual ? 'Billing Address' : 'Shipping Address'}
            </Text>
          </View>
          <View style={styles.selectedAddressContent}>
            <View style={{...styles.addressContainer, alignItems: 'center'}}>
              {/* If there is address selected */}
              {address && (
                <View flex={3} alignStart>
                  <Text style={{fontSize: 12, marginBottom: normalize(5)}}>
                    {address.firstname} {address.lastname}
                  </Text>
                  <Text style={{fontSize: 12}}>{address.street}</Text>
                  <Text style={{fontSize: 12}}>{address.city}</Text>
                  <Text style={{fontSize: 12}}>{address.region}</Text>
                  <Text style={{fontSize: 12}}>{address.telephone}</Text>
                </View>
              )}

              {/* If there is no address selected */}
              {!address && (
                <View flex={3} alignStart>
                  <Text style={{fontSize: 12}}>Select Address</Text>
                  <Text style={{fontSize: 12}}>Address not selected yet</Text>
                </View>
              )}

              {/* If loading */}
              {shippingAddressLoading && <ActivityIndicator />}

              {/* If loading done */}
              {!shippingAddressLoading && (
                <Button
                  onPress={() => setModalVisible(true)}
                  label="Change"
                  width={normalize(80)}
                  styleProp={{
                    flex: 1,
                  }}
                  textStyleProp={{
                    paddingVertical: normalize(3),
                  }}
                />
              )}
            </View>
            <UserAddressesModal />
          </View>
        </View>
      );
    },
    {name: 'SelectedAddressView'},
  );

  return (
    <SelectedAddressView
      address={cartIsVirtual ? selectedBillingAddress : selectedShippingAddress}
    />
  );
};

export default withProfiler(ShippingAddressBlock, {
  name: 'ShippingAddressBlock',
});
