import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';

import {useReactiveVar} from '@apollo/client';
import {rxCartIsVirtual} from '@app/services/cache';
import Button from '@app/components/Button';
import NavBar from '@app/components/NavBar';
import RenderIf from '@app/components/RenderIf';

import CartItemsBlock from '@app/_modules/cart/atoms/CartItemsBlock';
import GuestEmailBlock from '@app/_modules/cart/atoms/GuestEmailBlock';
import ShippingAddressBlock from '@app/_modules/cart/atoms/ShippingAddressBlock/index';
import ShippingMethodBlock from '@app/_modules/cart/atoms/ShippingMethodBlock';
import TotalPriceBlock from '@app/_modules/cart/atoms/TotalPriceBlock';
import styles from '@app/_modules/cart_shipping/styles';

function ShippingScreen({
  cart,
  onNavigateToPayment,
  userAddresses,
  selectedBillingAddress,
  selectedShippingAddress,
  onSelectShippingAddress,
  shippingAddressLoading,
  availableShippingMethods,
  selectedShippingMethod,
  onSelectShippingMethod,
  shippingMethodLoading,
  userType,
  onSetGuestEmail,
  isEmailFilled,
  activeSections,
  updateSections,
  dataPrices,
  dataExtraFee,
  dataAppliedStoreCredit,
  appliedGiftCard,
}) {
  const cartIsVirtual = useReactiveVar(rxCartIsVirtual);
  // MAIN
  if (cart && cart.length > 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavBar useBack title="Shipping" />
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={{alignItems: 'center'}}>
          <CartItemsBlock items={cart} />
          {userType === 'guest' && (
            <GuestEmailBlock
              onSetGuestEmail={onSetGuestEmail}
              isEmailFilled={isEmailFilled}
            />
          )}
          {/* <Divider /> */}
          <ShippingAddressBlock
            selectedShippingAddress={selectedShippingAddress}
            selectedBillingAddress={selectedBillingAddress}
            userAddresses={userAddresses}
            onSelectShippingAddress={onSelectShippingAddress}
            shippingAddressLoading={shippingAddressLoading}
          />
          {/* <Divider /> */}
          <RenderIf condition={!cartIsVirtual}>
            <ShippingMethodBlock
              selectedShippingAddress={selectedShippingAddress}
              availableShippingMethods={availableShippingMethods}
              selectedShippingMethod={selectedShippingMethod}
              onSelectShippingMethod={onSelectShippingMethod}
              shippingMethodLoading={shippingMethodLoading}
              activeSections={activeSections}
              updateSections={updateSections}
            />
          </RenderIf>
        </ScrollView>
        <TotalPriceBlock
          selectedShippingMethod={selectedShippingMethod}
          dataPrices={dataPrices}
          dataExtraFee={dataExtraFee}
          dataAppliedStoreCredit={dataAppliedStoreCredit}
          appliedGiftCard={appliedGiftCard}
        />
        <Button
          disabled={shippingAddressLoading || shippingMethodLoading}
          onPress={onNavigateToPayment}
          label="Proceed to Payment"
          styleProp={[
            styles.paymentButtonContainer,
            shippingAddressLoading || shippingMethodLoading
              ? styles.paymentButtonContainerDisabled
              : {},
          ]}
          textStyleProp={styles.paymentButtonText}
        />
      </SafeAreaView>
    );
  } else {
    return <ActivityIndicator />;
  }
}

export default withProfiler(ShippingScreen, {name: 'ShippingScreen'});
