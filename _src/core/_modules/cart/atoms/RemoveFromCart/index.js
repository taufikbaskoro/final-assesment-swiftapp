import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {useMutation, useReactiveVar} from '@apollo/client';
import {REMOVE_ITEM} from '@app/_modules/cart/services/schema';
import {rxCartId, rxAppSnackbar} from '@app/services/cache';
import {useRefetchCart} from '@app/hooks/useRefetchCart';
import AnalyticsHelper from '@app/helpers/Analytics';

import Section from '@app/components/Section';

const RemoveFromCart = ({cartItemId, product, children, propStyle = {}}) => {
  const cartId = useReactiveVar(rxCartId);
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState({});
  const [removeItemHook] = useMutation(REMOVE_ITEM);
  const {refetch: refetchCart} = useRefetchCart();

  /**
   * ----------------------------------------- *
   * @dependency [cartId, cartItemId]
   * @summary set variables cartId and cartItemId
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (cartId) {
      setVariables({
        input: {
          cart_id: cartId,
          cart_item_id: cartItemId,
        },
      });
    }
  }, [cartId, cartItemId]);

  /**
   * ----------------------------------------- *
   * @function onLogRemoveCartToAnalytics
   * @summary log remove product  to analytics
   * @profiler {googleAnalytics} removeItem
   * ----------------------------------------- *
   */
  const onLogRemoveCartToAnalytics = () => {
    const {id, sku, name, currency, price} = product;
    let item = {
      id,
      sku,
      name,
      currency,
      price,
    };
    AnalyticsHelper.eventRemoveItemCart({item});
  };

  /**
   * ----------------------------------------- *
   * @function onRemoveCartItem
   * @summary remove item on cart
   * ----------------------------------------- *
   */
  const onRemoveCartItem = async () => {
    setLoading(true);
    const result = await removeItemHook({variables});
    try {
      refetchCart(result.data.removeItemFromCart);
      rxAppSnackbar({
        message: 'Cart Item removed',
      });
      onLogRemoveCartToAnalytics();
      setLoading(false);
    } catch (error) {
      // console.log(error);
      rxAppSnackbar({
        message: 'Something went wrong',
      });
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <Section onPress={onRemoveCartItem} style={propStyle}>
      {children ? children : <Text>Delete</Text>}
    </Section>
  );
};

export default withProfiler(RemoveFromCart, {name: 'RemoveFromCart'});
