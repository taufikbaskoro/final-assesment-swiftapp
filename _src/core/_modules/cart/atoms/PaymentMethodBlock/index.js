import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioButton from '@app/components/RadioButton';
import {Text} from 'react-native';

import styles from '@app/_modules/cart/atoms/PaymentMethodBlock/styles';

const PaymentMethodBlock = ({
  availablePaymentMethods,
  selectedPaymentMethod,
  onSelectPaymentMethod,
  activeSections,
  updateSections,
}) => {
  const selectedStatus = item => {
    if (
      selectedPaymentMethod &&
      selectedPaymentMethod.title === item.title &&
      selectedPaymentMethod.code === item.code
    ) {
      return true;
    } else {
      return false;
    }
  };

  const PaymentMethodItem = ({method, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelectPaymentMethod(method);
        }}
        style={styles.itemContainer}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <RadioButton
            selected={
              selectedPaymentMethod && selectedPaymentMethod.title !== ''
                ? selectedStatus(method)
                : false
            }
          />
          <Text style={styles.paymentItemText}>{method.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  //eslint-disable-next-line no-shadow
  const renderHeader = (section, index, activeSections) => {
    if (section.value.length > 0) {
      return (
        <View style={styles.headerBlockStyle} key={index}>
          <View style={styles.headerBlockContentStyle}>
            <View style={{width: 40}}>
              <Icon
                name={section.icon}
                size={normalize(25)}
                color={Colors.GRAY_DARK}
                style={{alignSelf: 'center'}}
              />
            </View>
            <Text large bold style={styles.paymentGroupingText}>
              {section.title}
            </Text>
          </View>
          <Icon
            name={activeSections ? 'chevron-down' : 'chevron-right'}
            size={normalize(14)}
            color={'black'}
            style={{alignSelf: 'center'}}
          />
        </View>
      );
    }
    return null;
  };

  const renderContent = section => {
    return section.value.map((method, index) => {
      return (
        <PaymentMethodItem
          key={`${method.code}${index}`}
          method={method}
          index={index}
        />
      );
    });
  };

  return (
    <View style={styles.checkoutPaymentWrapper}>
      <View style={styles.checkoutPaymentTitle}>
        <Text style={styles.paymentTitle}>Payment</Text>
        <Text style={styles.paymentDescription}>
          Select your payment method
        </Text>
      </View>
      <View style={styles.checkoutPaymentContent}>
        {availablePaymentMethods &&
        Object.keys(availablePaymentMethods).length ? (
          <Accordion
            sections={availablePaymentMethods}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            touchableComponent={TouchableOpacity}
            onChange={updateSections}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

export default React.memo(
  withProfiler(PaymentMethodBlock, {name: 'PaymentMethodBlock'}),
);
