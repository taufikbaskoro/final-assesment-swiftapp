import React from 'react';
import {TouchableRipple, Text} from 'react-native-paper';
import {Image, View} from 'react-native';
import {shortenText} from '@app/helpers/General';

import RenderIf from '@app/components/RenderIf';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import styles from '@app/components/_ProductItem/styles';

const ProductItem = ({keyImage, image, name, currency, price, onPress}) => {
  const imageSourceCondition = image !== '';
  return (
    <TouchableRipple
      key={keyImage}
      onPress={onPress}
      style={styles.frameProductItem}>
      <View>
        <RenderIf condition={imageSourceCondition}>
          <FastImage
            key={keyImage}
            style={styles.itemImage}
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: image.toString(),
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
          />
        </RenderIf>
        <RenderIf condition={!imageSourceCondition}>
          <Image
            source={require('@app/assets/images/placeholder.png')}
            style={styles.itemImage}
          />
        </RenderIf>
        <Text style={styles.productItemName}>{shortenText(name, 16)}</Text>
        <Text style={styles.productItemPrice}>
          {currency} {price.toFixed(2)}
        </Text>
      </View>
    </TouchableRipple>
  );
};

ProductItem.propTypes = {
  // @summary image url of product
  image: PropTypes.string.isRequired,
  // @summary name of product
  name: PropTypes.string.isRequired,
  // @summary price of product
  price: PropTypes.number,
};

export default ProductItem;
