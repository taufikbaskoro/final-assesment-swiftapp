import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {rxAppSnackbar} from '@app/services/cache';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import RadioButton from '@app/components/RadioButton';
import Section from '@app/components/Section';
import Text from '@app/components/Text';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '@app/_modules/cart/atoms/ShippingMethodBlock/styles';

const ShippingMethodBlock = ({
  selectedShippingAddress,
  availableShippingMethods,
  selectedShippingMethod,
  onSelectShippingMethod,
  shippingMethodLoading,
  activeSections,
  updateSections,
}) => {
  const selectedStatus = item => {
    if (
      selectedShippingMethod.amount === item.amount.value &&
      selectedShippingMethod.carrier_code === item.carrier_code &&
      selectedShippingMethod.carrier_title === item.carrier_title &&
      selectedShippingMethod.method_code === item.method_code &&
      selectedShippingMethod.method_title === item.method_title
    ) {
      return true;
    } else {
      return false;
    }
  };

  const ShippingMethodItem = withProfiler(
    ({childItem}) => {
      const ItemPriceLabel = ({item}) => {
        if (item.amount.value === item.price_incl_tax.value) {
          return (
            <Text>
              {item.amount.currency} {item.amount.value}
            </Text>
          );
        } else {
          return (
            <>
              <Text lineThrough>
                {item.price_incl_tax.currency} {item.price_incl_tax.value}
              </Text>
              <Text>
                {item.amount.currency} {item.amount.value}
              </Text>
            </>
          );
        }
      };

      let itemLabel = childItem.carrier_title
        ? childItem.carrier_title + ' ' + childItem.method_title
        : childItem.method_title;

      itemLabel = childItem.shipping_promo_name
        ? itemLabel + ` (${childItem.shipping_promo_name})`
        : itemLabel;

      return (
        <TouchableOpacity
          onPress={() => {
            if (!selectedShippingAddress) {
              rxAppSnackbar({
                message: 'Please select your shipping address first',
              });
            } else {
              onSelectShippingMethod(childItem);
            }
            onSelectShippingMethod(childItem);
          }}
          style={styles.itemContainer}>
          <RadioButton
            selected={
              selectedShippingMethod ? selectedStatus(childItem) : false
            }
          />
          <View style={styles.textShippingGroupingContentLabelWrapper}>
            <Text style={styles.textShippingGroupingContentLabel}>
              {itemLabel}
            </Text>
            <View>
              <ItemPriceLabel item={childItem} />
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    {name: 'ShippingMethodItem'},
  );

  //eslint-disable-next-line no-shadow
  const renderHeader = (section, index, activeSections, sections) => {
    if (section.value.length > 0) {
      return (
        <Section
          row
          vpadding={5}
          width={'100%'}
          style={[
            styles.headerBlockStyle,
            index === availableShippingMethods.length - 1
              ? {borderBottomWidth: 0}
              : {},
          ]}>
          <Section width={normalize(45)}>
            <Icon
              name={section.icon}
              size={normalize(20)}
              color={Colors.GRAY_DARK}
              style={{alignSelf: 'center'}}
            />
          </Section>
          <View style={styles.textShippingGroupingHeaderLabelWrapper}>
            <Text style={styles.textShippingGrouping}>{section.title}</Text>
            <Section width={normalize(45)}>
              <Icon
                name={activeSections ? 'chevron-down' : 'chevron-right'}
                size={normalize(12)}
                color={'black'}
                style={{alignSelf: 'flex-end', paddingRight: 15}}
              />
            </Section>
          </View>
        </Section>
      );
    }
    return null;
  };

  const renderContent = section => {
    return section.value.map((childItem, index) => {
      return (
        <ShippingMethodItem
          key={`${childItem.code}${index}`}
          childItem={childItem}
          index={index}
          style={{width: '100%'}}
        />
      );
    });
  };

  const RenderContainer = () => {
    // if loading === true
    if (shippingMethodLoading) {
      return (
        <Section
          centerChildren
          border={Colors.GRAY_MEDIUM}
          vpadding={15}
          vmargin={15}
          radius={15}>
          <ActivityIndicator />
        </Section>
      );
    }

    // if selectedShippingAddress is not undefined and
    // selectedShippingAddress data is more than 1
    if (
      selectedShippingAddress &&
      Object.keys(availableShippingMethods).length
    ) {
      return (
        <Accordion
          sections={availableShippingMethods}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          touchableComponent={TouchableOpacity}
          onChange={updateSections}
        />
      );
    } else {
      return (
        <View style={{backgroundColor: 'white', padding: 15, borderRadius: 8}}>
          <Text style={{fontSize: 14}} center>
            Please select Shipping Address
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{width: '100%', marginBottom: 35}}>
      <View style={{paddingVertical: 15}}>
        <Text style={{fontWeight: '500', fontSize: 14}}>Shipping Method</Text>
      </View>
      <View style={{borderRadius: 8, overflow: 'hidden'}}>
        {RenderContainer()}
      </View>
    </View>
  );
};

export default withProfiler(ShippingMethodBlock, {name: 'ShippingMethodBlock'});
