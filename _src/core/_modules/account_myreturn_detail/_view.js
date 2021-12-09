import React from 'react';
import {View, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {withProfiler} from '@sentry/react-native';
import {normalize} from '@app/styles/mixins';
import {Colors, Mixins} from '@app/styles';

import NavBar from '@app/components/NavBar';
import RenderIf from '@app/components/RenderIf';
import Button from '@app/components/Button';
import Text from '@app/components/Text';
import RMAFormModal from '@app/_modules/account/atoms/RMAFormModal';

import styles from '@app/_modules/account_myreturn_detail/styles';

const OrderStatus = withProfiler(
  ({label, status, index}) => {
    return (
      <View>
        <View
          style={[
            {
              borderColor: status >= index ? Colors.PRIMARY : Colors.BLACK,
            },
            styles.orderStatusItemContainer,
          ]}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Text center small style={styles.orderStatusItemText}>
            {label}
          </Text>
        </View>
      </View>
    );
  },
  {name: 'OrderStatus'},
);

const OrderStatusLine = withProfiler(
  ({status, index}) => {
    return (
      <View
        style={[
          {borderColor: status >= index ? Colors.PRIMARY : Colors.BLACK},
          styles.orderStatusLine,
        ]}
      />
    );
  },
  {name: 'OrderStatusLine'},
);

const OrderItemDetail = withProfiler(
  ({item}) => {
    const {detail, status} = item;
    const {
      shipping_address,
      shipping_methods,
      payment,
      subtotal,
      grand_total,
      global_currency_code,
    } = detail[0];
    const {firstname, lastname, city, postcode, region, street, telephone} =
      shipping_address;
    const {shipping_description} = shipping_methods;
    const {shipping_amount, payment_additional_info} = payment;
    const {method_title: payment_method_title, virtual_account} =
      payment_additional_info;

    let orderStatus = 0;

    switch (status) {
      case 'pending_payment':
        orderStatus = -1;
        break;
      case 'canceled':
        orderStatus = -2;
        break;
      case 'new':
        orderStatus = 0;
        break;
      case 'processing':
        orderStatus = 1;
        break;
      // TODO : double check available statuses
      case 'shipped':
        orderStatus = 2;
        break;
      case 'complete':
        orderStatus = 3;
        // orderStatus = 2;
        break;
      default:
        orderStatus = 0;
        break;
    }

    return (
      <View style={styles.detailsMainContainer}>
        <View style={styles.priceBlockContainer}>
          {/* price block */}
          <View
            style={{
              marginBottom: normalize(10),
            }}>
            <View style={styles.rowContainer}>
              <Text>Subtotal</Text>
              <Text>
                {global_currency_code} {subtotal}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text>Shipping</Text>
              <Text>
                {global_currency_code} {shipping_amount}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text bold>Total</Text>
              <Text bold>
                {global_currency_code} {grand_total}
              </Text>
            </View>
          </View>
          {/* end of price block */}

          {/* Order status block */}
          <View style={styles.orderStatusContainer}>
            <OrderStatus
              label={orderStatus < 0 ? 'Waiting for Confirmation' : 'Purchased'}
              index={0}
              status={orderStatus}
            />
            <OrderStatusLine index={1} status={orderStatus} />
            <OrderStatus label="Processing" index={1} status={orderStatus} />
            <OrderStatusLine index={2} status={orderStatus} />
            <OrderStatus label="Shipped" index={2} status={orderStatus} />
            <OrderStatusLine index={3} status={orderStatus} />
            <OrderStatus label="Complete" index={3} status={orderStatus} />
          </View>
          {/* end of status block */}

          {/* Address Information block */}
          <View
            style={[styles.spacingMargin, {maxWidth: Mixins.MAX_WIDTH * 0.6}]}>
            <Text bold>Address Information</Text>
            <Text small>
              {firstname} {lastname}
            </Text>
            <Text small>{street}</Text>
            <Text small>
              {city}, {region}, {postcode}
            </Text>
            <Text small>{telephone}</Text>
          </View>
          {/* end of address information block */}

          {/* Shipping Method block */}
          <View style={styles.spacingMargin}>
            <Text bold>Shipping Method</Text>
            <Text small>{shipping_description}</Text>
          </View>
          {/* end of shipping method block */}

          {/* Payment Method block */}
          <View style={styles.spacingMargin}>
            <Text bold>Payment Method</Text>
            <Text small>{payment_method_title}</Text>
            {virtual_account ? <Text small>{virtual_account}</Text> : null}
          </View>
          {/* end of Payment method block */}
        </View>
      </View>
    );
  },
  {name: 'OrderItemDetail'},
);

function PurchaseDetailScreen({
  item,
  onRequestReturn,
  rmaFormData,
  formDataLoading,
  rmaFormVisibility,
  setRmaFormVisibility,
}) {
  let itemFinal = item.ordersFilter.data;
  let isEmptyData = itemFinal.length < 1;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <NavBar title="Order Detail" />
      {isEmptyData && <Text>No Data Found</Text>}
      {!isEmptyData && (
        <ScrollView>
          <OrderItemDetail item={itemFinal[0]} />
          <RenderIf condition={itemFinal[0].detail[0].aw_rma.status}>
            <View style={{alignItems: 'center'}}>
              <RenderIf condition={formDataLoading}>
                <ActivityIndicator color="red" />
              </RenderIf>
              <RenderIf condition={!formDataLoading}>
                <Button
                  label="Request Return"
                  styleProp={styles.returnRequestButton}
                  textStyleProp={styles.returnRequestButtonText}
                  onPress={() => onRequestReturn()}
                />
              </RenderIf>
            </View>
          </RenderIf>
        </ScrollView>
      )}
      <RenderIf condition={rmaFormData}>
        <RMAFormModal
          orderNumber={itemFinal[0].order_number}
          rmaFormData={rmaFormData}
          visible={rmaFormVisibility}
          setVisible={setRmaFormVisibility}
        />
      </RenderIf>
    </SafeAreaView>
  );
}

export default withProfiler(PurchaseDetailScreen, {
  name: 'PurchaseDetailScreen',
});
