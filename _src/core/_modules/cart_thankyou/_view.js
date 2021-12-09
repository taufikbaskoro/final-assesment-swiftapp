import React from 'react';
import {View} from 'react-native';
import {Text, Caption, Button} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {navReset} from '@app/helpers/Navigation';
import {tabsApp} from '@root/swift.config';

import AppStyles from '@app/styles/app';

import styles from '@app/_modules/cart_thankyou/styles';

function ThankyouScreen({orderId}) {
  return (
    <View style={AppStyles.flexCenter}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text>Thank You for your purchase</Text>
          <Caption>Your order number : {orderId}</Caption>
        </View>
        <Button mode="contained" onPress={() => navReset(tabsApp.name)}>
          Continue Shopping
        </Button>
      </View>
    </View>
  );
}

export default withProfiler(ThankyouScreen, {name: 'ThankyouScreen'});
