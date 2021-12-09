import React from 'react';
import {ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useColorScheme} from 'react-native-appearance';
import {withProfiler} from '@sentry/react-native';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {SafeAreaView} from 'react-native-safe-area-context';

import RMAFormModal from '@app/_modules/account/atoms/RMAFormModal';
import ShippingDetail from '@app/_modules/account/atoms/ShippingDetail';
import Button from '@app/components/Button';
import AppBar from '@app/components/AppBar';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

import styles from '@app/_modules/account_purchases_detail/styles';

const OrderStatus = withProfiler(
  ({label, status, index}) => {
    const scheme = useColorScheme();
    let inactiveBorderDarkThemeColor =
      scheme === 'dark' ? Colors.WHITE : Colors.BLACK;
    return (
      <Section>
        <Section
          height={normalize(50)}
          heightScaling={false}
          width={normalize(50)}
          radius={5}
          border={
            status >= index ? Colors.PRIMARY : inactiveBorderDarkThemeColor
          }
        />
        <Section row flex>
          <Text xsmall center alignStart style={styles.orderStatusItemText}>
            {label}
          </Text>
        </Section>
      </Section>
    );
  },
  {name: 'OrderStatus'},
);

const OrderStatusLine = withProfiler(
  ({status, index}) => {
    const scheme = useColorScheme();
    let inactiveBorderDarkThemeColor =
      scheme === 'dark' ? Colors.WHITE : Colors.BLACK;
    return (
      <Section
        height={normalize(2)}
        width={Math.ceil((Mixins.MAX_WIDTH * 0.8 - 200) * 0.3)}
        border={status >= index ? Colors.PRIMARY : inactiveBorderDarkThemeColor}
        flex
        style={styles.orderStatusLine}
      />
    );
  },
  {name: 'OrderStatusLine'},
);

const AddressInformationBlock = withProfiler(
  ({address, title}) => {
    const scheme = useColorScheme();
    const {firstname, lastname, city, postcode, region, street, telephone} =
      address;

    return (
      <Section
        vmargin
        alignStart
        width="100%"
        backgroundColor={
          scheme === 'dark' ? Colors.GRAY_DARK : Colors.GRAY_LIGHT
        }>
        <Text bold style={styles.blockHeaderText}>
          {title}
        </Text>
        <Text small>
          {firstname} {lastname}
        </Text>
        <Text small>{street}</Text>
        <Text small>
          {city}, {region}, {postcode}
        </Text>
        <Text small>{telephone}</Text>
      </Section>
    );
  },
  {name: 'AddressInformationBlock'},
);

const ProductItemsBlock = withProfiler(
  ({items, global_currency_code}) => {
    return (
      <Section radius vmargin centerChildren hpadding vpadding2>
        <Text alignStart bold style={styles.productItemsTitle}>
          Items
        </Text>
        {items.map((item, index) => {
          return (
            <Section row spaceBetween width={'100%'}>
              <Text center alignCenter style={{width: '10%'}}>
                {index + 1}.
              </Text>
              <Text alignCenter style={{width: '40%'}}>
                {item.name}
              </Text>
              <Text alignCenter style={{width: '15%'}}>
                {item.qty_ordered} pcs
              </Text>
              <Text alignCenter style={{width: '25%'}}>
                {global_currency_code} {item.price}
              </Text>
            </Section>
          );
        })}
      </Section>
    );
  },
  {name: 'ProductItemsBlock'},
);

const OrderItemDetail = withProfiler(
  ({item}) => {
    const scheme = useColorScheme();

    const {detail, status} = item;
    const {
      billing_address,
      shipping_address,
      shipping_methods,
      items,
      payment,
      subtotal,
      grand_total,
      global_currency_code,
      discount_amount,
    } = detail[0];

    const {shipping_description, shipping_detail} = shipping_methods;
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
      case 'ready_to_ship':
        orderStatus = 2;
        break;
      case 'complete':
        orderStatus = 3;
        break;
      default:
        orderStatus = 0;
        break;
    }

    let backgroundColor =
      scheme === 'dark' ? Colors.GRAY_DARK : Colors.GRAY_LIGHT;

    return (
      <Section flex centerChildren vmargin2>
        <Section
          hpadding2
          vpadding
          backgroundColor={backgroundColor}
          radius
          width={Mixins.MAX_WIDTH * 0.9}
          centerChildren>
          {/* price block */}
          <Section width={'100%'} vmargin>
            <Section
              width={'100%'}
              row
              spaceBetween
              backgroundColor={backgroundColor}>
              <Text>Subtotal</Text>
              <Text>
                {global_currency_code} {subtotal}
              </Text>
            </Section>
            <Section
              width={'100%'}
              row
              spaceBetween
              backgroundColor={backgroundColor}>
              <Text>Shipping</Text>
              <Text>
                {global_currency_code} {shipping_amount}
              </Text>
            </Section>
            <Section
              width={'100%'}
              row
              spaceBetween
              backgroundColor={backgroundColor}>
              <Text>Discount</Text>
              <Text>
                {global_currency_code} {discount_amount}
              </Text>
            </Section>
            <Section
              width={'100%'}
              row
              spaceBetween
              backgroundColor={backgroundColor}>
              <Text bold>Total</Text>
              <Text bold>
                {global_currency_code} {grand_total}
              </Text>
            </Section>
          </Section>
          {/* end of price block */}

          {/* Product Items block */}
          <ProductItemsBlock
            items={items}
            global_currency_code={global_currency_code}
          />
          {/* end of product items block */}

          {/* Billing Address Information block */}
          <RenderIf condition={!shipping_address}>
            <AddressInformationBlock
              address={billing_address}
              title="Billing Address"
            />
          </RenderIf>
          {/* end of billing address information block */}
          <RenderIf condition={shipping_address}>
            {/* Shipping Address Information block */}
            <AddressInformationBlock
              address={shipping_address}
              title="Shipping Address &amp; Billing Address"
            />
            {/* end of shipping address information block */}

            {/* Shipping Method block */}
            <Section
              width={'100%'}
              alignStart
              vmargin
              backgroundColor={backgroundColor}>
              <Text bold style={styles.blockHeaderText}>
                Shipping Method
              </Text>
              <Text small>{shipping_description}</Text>
              <ShippingDetail
                shipping_description={shipping_description}
                shipping_detail={shipping_detail}
              />
            </Section>
            {/* end of shipping method block */}
          </RenderIf>

          {/* Order status block */}
          <RenderIf condition={shipping_address}>
            <Section flex radius vmargin centerChildren hpadding2 vpadding2 row>
              <OrderStatus
                label={
                  orderStatus < 0 ? 'Waiting for Confirmation' : 'Purchased'
                }
                index={0}
                status={orderStatus}
              />
              <OrderStatusLine index={1} status={orderStatus} />
              <OrderStatus label="Processing" index={1} status={orderStatus} />
              <OrderStatusLine index={2} status={orderStatus} />
              <OrderStatus
                label="Ready To Ship"
                index={2}
                status={orderStatus}
              />
              <OrderStatusLine index={3} status={orderStatus} />
              <OrderStatus label="Shipped" index={3} status={orderStatus} />
            </Section>
          </RenderIf>
          {/* end of status block */}

          {/* Payment Method block */}
          <Section
            width={'100%'}
            alignStart
            vmargin
            backgroundColor={backgroundColor}>
            <Text bold style={styles.blockHeaderText}>
              Payment Method
            </Text>
            <Text small>{payment_method_title}</Text>
            {virtual_account ? <Text small>{virtual_account}</Text> : null}
          </Section>
          {/* end of Payment method block */}
        </Section>
      </Section>
    );
  },
  {name: 'OrderItemDetail'},
);

const PurchaseDetailScreen = ({
  item,
  onRequestReturn,
  rmaFormData,
  formDataLoading,
  rmaFormVisibility,
  setRmaFormVisibility,
}) => {
  let itemFinal = item.ordersFilter.data;
  let isEmptyData = itemFinal.length < 1;

  return (
    <SafeAreaView style={{flex: 1}}>
      <AppBar useBack title="Order Detail" />
      <Section safe centerChildren flex>
        {isEmptyData && <Text>No Data Found</Text>}
        {!isEmptyData && (
          <ScrollView>
            <OrderItemDetail item={itemFinal[0]} />
            <RenderIf condition={itemFinal[0]?.detail[0]?.aw_rma.status}>
              <Section centerChildren>
                <RenderIf condition={formDataLoading}>
                  <ActivityIndicator color="red" />
                </RenderIf>
                <RenderIf condition={!formDataLoading}>
                  <Button
                    label="Request Return"
                    styleProp={styles.requestReturnButton}
                    textStyleProp={styles.requestReturnButtonText}
                    onPress={() => onRequestReturn()}
                  />
                </RenderIf>
              </Section>
            </RenderIf>
          </ScrollView>
        )}
        <RenderIf condition={rmaFormData}>
          <RMAFormModal
            orderNumber={itemFinal[0]?.order_number}
            rmaFormData={rmaFormData}
            visible={rmaFormVisibility}
            setVisible={setRmaFormVisibility}
          />
        </RenderIf>
      </Section>
    </SafeAreaView>
  );
};

export default withProfiler(PurchaseDetailScreen, {
  name: 'PurchaseDetailScreen',
});
