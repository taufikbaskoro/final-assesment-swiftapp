import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {normalize} from '@app/styles/mixins';
import {withProfiler} from '@sentry/react-native';

import FastImage from 'react-native-fast-image';
import Section from '@app/components/Section';
import Text from '@app/components/Text';
import styles from '@app/_modules/cart/atoms/CartItemsBlock/styles';

const CartItem = withProfiler(
  ({item, index}) => (
    <View
      style={
        index === 0
          ? styles.cartItemContainerNoBorderTop
          : styles.cartItemContainer
      }>
      <View style={styles.itemWrapper}>
        {item.image === '' ? (
          <Section height={normalize(50)} width={normalize(50)} flex />
        ) : (
          <FastImage
            key={item.url_key}
            style={styles.itemImages}
            source={{
              uri: item.image,
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQty}>Qty : {item.quantity}</Text>
        <Text alignStart style={styles.itemPrice}>
          IDR
          {item.price_range === undefined
            ? item.price
            : item.price_range.maximum_price.final_price.value}
        </Text>
      </View>
    </View>
  ),
  {name: 'CartItem'},
);

const CartItemsBlock = ({items}) => {
  if (items && items.length > 0) {
    return (
      <View style={styles.cartItemWrapper}>
        <View style={styles.cartItemTitle}>
          <Text style={{fontSize: 14, fontWeight: '500'}}>Items</Text>
          <Text style={{fontSize: 12, fontWeight: '500'}}>
            {items.length} items
          </Text>
        </View>
        <View style={styles.cartItemContent}>
          {items &&
            items.map((item, index) => (
              <CartItem key={item.name} index={index} item={item} />
            ))}
        </View>
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
};

export default withProfiler(CartItemsBlock, {name: 'CartItemsBlock'});
