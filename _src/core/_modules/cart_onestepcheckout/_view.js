/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, SafeAreaView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {withProfiler} from '@sentry/react-native';
import {useReactiveVar} from '@apollo/client';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {RemoveFromCartButton, UpdateCartItemModal} from '@app/_modules/cart';
import {
  rxCartPayment,
  rxCartShipping,
  rxCartBillingAddress,
  rxCartIsVirtual,
  rxUserAddresses,
  rxCartShippingAddress,
} from '@app/services/cache';

import styles from '@app/_modules/cart_onestepcheckout/styles';
import Button from '@app/components/Button';
import NavBar from '@app/components/NavBar';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';
import FastImage from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import PaymentMethodBlock from '@app/_modules/cart/atoms/PaymentMethodBlock';
import ShippingAddressBlock from '@app/_modules/cart/atoms/ShippingAddressBlock';
import ShippingMethodBlock from '@app/_modules/cart/atoms/ShippingMethodBlock';

const STEP = {
  1: 'CART_ITEMS_STEP',
  2: 'ADDRESS_STEP',
  3: 'SHIPPING_METHOD_STEP',
  4: 'PAYMENT_STEP',
  5: 'SUMMARY_STEP',
};

function OneStepCheckoutScreen({
  navigation,
  currentStep,
  setCurrentStep,
  //
  cartItems,
  onSelectShippingAddress,
  shippingAddressLoading,
  availableShippingMethods,
  selectedShippingMethod,
  onSelectShippingMethod,
  availablePaymentMethods,
  selectedPaymentMethod,
  onSelectPaymentMethod,
  onSummaryStep,
  cartPrices,
  snapUrl,
  refetchSnap,
  onPlaceOrder,
}) {
  const [showSnapModal, setShowSnapModal] = useState(false);

  useEffect(() => {
    if (snapUrl) {
      setShowSnapModal(true);
    }
  }, [snapUrl]);

  const SnapWebView = withProfiler(
    ({snapUrl, showSnapModal, setShowSnapModal}) => {
      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={showSnapModal}
          onRequestClose={() => {
            setShowSnapModal(false);
            refetchSnap();
          }}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
            }}>
            <Section flex>
              <WebView
                onNavigationStateChange={webViewState => {
                  if (
                    !webViewState.url.startsWith(
                      'https://app.sandbox.midtrans.com/snap/v2/vtweb/',
                    )
                  ) {
                    setShowSnapModal(false);
                    refetchSnap();
                  }
                }}
                source={{uri: snapUrl}}
                style={{flex: 1}}
              />
            </Section>
          </SafeAreaView>
        </Modal>
      );
    },
    {name: 'SnapWebView'},
  );

  const StepNavigationBtnBlock = withProfiler(
    ({nextLabel = 'Next', onPressNext = null, noBackButton = false}) => {
      return (
        <Section row spaceAround width={Mixins.MAX_WIDTH * 0.9} vpadding>
          <RenderIf condition={!noBackButton}>
            <Button
              width={(Mixins.MAX_WIDTH * 0.8) / 2}
              label="Back"
              onPress={() => {
                setCurrentStep(currentStep - 1);
              }}
            />
          </RenderIf>
          <Button
            width={
              noBackButton
                ? Mixins.MAX_WIDTH * 0.8
                : (Mixins.MAX_WIDTH * 0.8) / 2
            }
            label={nextLabel}
            onPress={() => {
              if (onPressNext) {
                onPressNext();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
          />
        </Section>
      );
    },
    {name: 'StepNavigationBlock'},
  );

  const CartItemsStep = withProfiler(
    ({visible, cartItems}) => {
      return (
        <Section flex={visible} maxWidth alignCenter border vmargin={1}>
          <Section
            centerChildren
            maxWidth
            style={{backgroundColor: visible ? Colors.PRIMARY : Colors.WHITE}}>
            <Text
              center
              style={[
                visible
                  ? {
                      borderBottomWidth: 1,
                      borderColor: Mixins.BLACK,
                      width: Mixins.MAX_WIDTH,
                      color: Colors.WHITE,
                      fontWeight: 'bold',
                    }
                  : {},
                {paddingVertical: normalize(10)},
              ]}>
              Step : Cart Items
            </Text>
          </Section>
          <RenderIf condition={visible}>
            <Section centerChildren spaceBetween flex>
              <FlatList
                style={{width: Mixins.MAX_WIDTH - 10}}
                data={cartItems}
                renderItem={({item}) => (
                  <Section
                    flex
                    row
                    centerChildren
                    style={{
                      borderBottomWidth: 1,
                      borderColor: Colors.GRAY_MEDIUM,
                    }}>
                    <Section alignStart flex={1.5} vpadding>
                      {item.image ? (
                        <FastImage
                          key={item.url_key}
                          style={{
                            height: normalize(110),
                            width: Mixins.MAX_WIDTH * 0.25,
                            borderColor: Colors.GRAY_MEDIUM,
                            borderWidth: 1,
                            borderRadius: normalize(10),
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                          source={{
                            uri: item.image,
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable,
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      ) : (
                        <Section
                          width={Mixins.MAX_WIDTH * 0.3}
                          height={normalize(150)}
                          backgroundColor={Colors.GRAY_LIGHT}
                        />
                      )}
                    </Section>
                    <Section flex={3} alignStart justifyCenter>
                      <Text style={styles.cartItemDetailText}>{item.name}</Text>
                      <Text style={styles.cartItemDetailText}>
                        Qty: {item.quantity}
                      </Text>
                      <Text bold style={[styles.cartItemDetailText]}>
                        IDR {item.price}
                      </Text>

                      <Section
                        row
                        width={normalize(100)}
                        spaceBetween
                        vmargin={15}>
                        <UpdateCartItemModal
                          name={item.name}
                          cartItemId={item.cartItemId}
                          initialQuantity={item.quantity}
                          propStyle={styles.cartItemActionIcon}>
                          <SimpleLineIcons name="pencil" size={normalize(15)} />
                        </UpdateCartItemModal>
                        <RemoveFromCartButton
                          cartItemId={item.cartItemId}
                          propStyle={styles.cartItemActionIcon}>
                          <SimpleLineIcons name="trash" size={normalize(15)} />
                        </RemoveFromCartButton>
                      </Section>
                    </Section>
                  </Section>
                )}
                keyExtractor={item => item.cartItemId.toString()}
                ListEmptyComponent={
                  cartItems === undefined || cartItems === null ? (
                    <ActivityIndicator />
                  ) : (
                    <Text center>No Data</Text>
                  )
                }
              />
              <StepNavigationBtnBlock noBackButton />
            </Section>
          </RenderIf>
        </Section>
      );
    },
    {name: 'CartItemsStep'},
  );

  const AddressStep = withProfiler(
    ({visible}) => {
      const userAddresses = useReactiveVar(rxUserAddresses);
      const selectedShippingAddress = useReactiveVar(rxCartShippingAddress);
      const selectedBillingAddress = useReactiveVar(rxCartBillingAddress);

      return (
        <Section flex={visible} maxWidth alignCenter border vmargin={1}>
          <Section
            centerChildren
            maxWidth
            style={{backgroundColor: visible ? Colors.PRIMARY : Colors.WHITE}}>
            <Text
              center
              style={[
                visible
                  ? {
                      borderBottomWidth: 1,
                      borderColor: Mixins.BLACK,
                      width: Mixins.MAX_WIDTH,
                      color: Colors.WHITE,
                      fontWeight: 'bold',
                    }
                  : {},
                {paddingVertical: normalize(10)},
              ]}>
              Step : Shipping &amp; Billing address
            </Text>
          </Section>
          <RenderIf condition={visible}>
            <Section centerChildren spaceBetween flex>
              <ShippingAddressBlock
                selectedShippingAddress={selectedShippingAddress}
                selectedBillingAddress={selectedBillingAddress}
                userAddresses={userAddresses}
                onSelectShippingAddress={onSelectShippingAddress}
                shippingAddressLoading={shippingAddressLoading}
              />
              <StepNavigationBtnBlock />
            </Section>
          </RenderIf>
        </Section>
      );
    },
    {name: 'AddressStep'},
  );

  const ShippingMethodStep = withProfiler(
    ({visible, selectedShippingMethod}) => {
      const cartIsVirtual = useReactiveVar(rxCartIsVirtual);
      const selectedShippingAddress = useReactiveVar(rxCartShippingAddress);
      const activeSections = useReactiveVar(rxCartShipping);

      const updateSections = activeSection => {
        rxCartShipping(activeSection);
      };

      return (
        <Section flex={visible} maxWidth alignCenter border vmargin={1}>
          <Section
            centerChildren
            maxWidth
            style={{backgroundColor: visible ? Colors.PRIMARY : Colors.WHITE}}>
            <Text
              center
              style={[
                visible
                  ? {
                      borderBottomWidth: 1,
                      borderColor: Mixins.BLACK,
                      width: Mixins.MAX_WIDTH,
                      color: Colors.WHITE,
                      fontWeight: 'bold',
                    }
                  : {},
                {paddingVertical: normalize(10)},
              ]}>
              Step : Shipping method
            </Text>
          </Section>
          <RenderIf condition={visible}>
            <Section centerChildren spaceBetween flex>
              <RenderIf condition={!cartIsVirtual}>
                <ShippingMethodBlock
                  selectedShippingAddress={selectedShippingAddress}
                  availableShippingMethods={availableShippingMethods}
                  selectedShippingMethod={selectedShippingMethod}
                  onSelectShippingMethod={onSelectShippingMethod}
                  activeSections={activeSections}
                  updateSections={updateSections}
                />
              </RenderIf>
              <StepNavigationBtnBlock />
            </Section>
          </RenderIf>
        </Section>
      );
    },
    {name: 'ShippingMethodStep'},
  );

  const PaymentStep = withProfiler(
    ({visible, selectedPaymentMethod}) => {
      const activeSections = useReactiveVar(rxCartPayment);

      const updateSections = activeSection => {
        rxCartPayment(activeSection);
      };

      return (
        <Section flex={visible} maxWidth alignCenter border vmargin={1}>
          <Section
            centerChildren
            maxWidth
            style={{backgroundColor: visible ? Colors.PRIMARY : Colors.WHITE}}>
            <Text
              center
              style={[
                visible
                  ? {
                      borderBottomWidth: 1,
                      borderColor: Mixins.BLACK,
                      width: Mixins.MAX_WIDTH,
                      color: Colors.WHITE,
                      fontWeight: 'bold',
                    }
                  : {},
                {paddingVertical: normalize(10)},
              ]}>
              Step : Payment method
            </Text>
          </Section>
          <RenderIf condition={visible}>
            <Section centerChildren spaceBetween flex>
              <PaymentMethodBlock
                availablePaymentMethods={availablePaymentMethods}
                selectedPaymentMethod={selectedPaymentMethod}
                onSelectPaymentMethod={onSelectPaymentMethod}
                activeSections={activeSections}
                updateSections={updateSections}
              />
              <StepNavigationBtnBlock
                onPressNext={() => {
                  onSummaryStep();
                }}
              />
            </Section>
          </RenderIf>
        </Section>
      );
    },
    {name: 'PaymentStep'},
  );

  const SummaryStep = withProfiler(
    ({visible, cartPrices}) => {
      if (cartPrices) {
        const {
          prices,
          applied_store_credit,
          shipping_addresses,
          applied_extra_fee,
        } = cartPrices;

        const {grand_total, subtotal_including_tax} = prices;
        const {extrafee_value} = applied_extra_fee;
        const {is_use_store_credit, store_credit_amount} = applied_store_credit;
        const {selected_shipping_method} = shipping_addresses[0];
        const shippingFee = selected_shipping_method.amount;

        return (
          <Section flex={visible} maxWidth alignCenter border vmargin={1}>
            <Section
              centerChildren
              maxWidth
              style={{
                backgroundColor: visible ? Colors.PRIMARY : Colors.WHITE,
              }}>
              <Text
                center
                style={[
                  visible
                    ? {
                        borderBottomWidth: 1,
                        borderColor: Mixins.BLACK,
                        width: Mixins.MAX_WIDTH,
                        color: Colors.WHITE,
                        fontWeight: 'bold',
                      }
                    : {},
                  {paddingVertical: normalize(10)},
                ]}>
                Step : Summary
              </Text>
            </Section>
            <RenderIf condition={visible}>
              <Section centerChildren alignStart vmargin spaceBetween flex>
                <Section alignStart>
                  <Text>Subtotal: {subtotal_including_tax.value}</Text>
                  <RenderIf condition={applied_extra_fee.show_on_cart}>
                    <Text>Extra Fee:</Text>
                    <Text style={{marginLeft: normalize(20)}}>
                      {applied_extra_fee.title}: {extrafee_value.value}
                    </Text>
                  </RenderIf>
                  <RenderIf condition={is_use_store_credit}>
                    <Text>Store Credit: {store_credit_amount}</Text>
                  </RenderIf>
                  <Text>Shipping Fee: {shippingFee.value}</Text>
                  <Text>Grand Total: {grand_total.value}</Text>
                </Section>
                <StepNavigationBtnBlock
                  nextLabel="Order"
                  onPressNext={onPlaceOrder}
                />
              </Section>
            </RenderIf>
          </Section>
        );
      } else {
        return (
          <Section flex={visible} maxWidth alignCenter border vmargin={1}>
            <Section
              centerChildren
              maxWidth
              style={{
                backgroundColor: visible ? Colors.PRIMARY : Colors.WHITE,
              }}>
              <Text
                center
                style={[
                  visible
                    ? {
                        borderBottomWidth: 1,
                        borderColor: Mixins.BLACK,
                        width: Mixins.MAX_WIDTH,
                        color: Colors.WHITE,
                        fontWeight: 'bold',
                      }
                    : {},
                  {paddingVertical: normalize(10)},
                ]}>
                Step : Summary
              </Text>
            </Section>
            <RenderIf condition={visible}>
              <ActivityIndicator />
            </RenderIf>
          </Section>
        );
      }
    },
    {name: 'SummaryStep'},
  );

  return (
    <Section flex safe>
      <NavBar
        title="One Step Checkout"
        onBack={() => {
          if (currentStep !== 1) {
            setCurrentStep(currentStep - 1);
          } else {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }
        }}
      />
      <Section flex maxWidth centerChildren>
        <CartItemsStep
          visible={STEP[currentStep] === STEP[1]}
          cartItems={cartItems}
        />

        <AddressStep visible={STEP[currentStep] === STEP[2]} />

        <ShippingMethodStep
          visible={STEP[currentStep] === STEP[3]}
          selectedShippingMethod={selectedShippingMethod}
        />

        <PaymentStep
          visible={STEP[currentStep] === STEP[4]}
          selectedPaymentMethod={selectedPaymentMethod}
        />

        <SummaryStep
          visible={STEP[currentStep] === STEP[5]}
          cartPrices={cartPrices}
        />
      </Section>
      <SnapWebView
        snapUrl={snapUrl}
        showSnapModal={showSnapModal}
        setShowSnapModal={setShowSnapModal}
      />
    </Section>
  );
}

export default withProfiler(OneStepCheckoutScreen, {
  name: 'OneStepCheckoutScreen',
});
