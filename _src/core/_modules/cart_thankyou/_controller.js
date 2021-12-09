import React, {useEffect, useState} from 'react';
import {withProfiler} from '@sentry/react-native';
import Views from '@app/_modules/cart_thankyou/_view';
import {modules} from '@root/swift.config';

const Thankyou = ({route}) => {
  if (!modules.cart_thankyou.enable) {
    return null;
  }

  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (route) {
      setOrderId(route?.params?.orderId);
    }
  }, [route]);

  return <Views orderId={orderId} />;
};

export default withProfiler(Thankyou, {name: 'Thankyou'});
