import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useMutation, useReactiveVar} from '@apollo/client';
import {rxCartId, rxAppSnackbar} from '@app/services/cache';
import {useRefetchCart} from '@app/hooks/useRefetchCart';
import {withProfiler} from '@sentry/react-native';
import {UPDATE_CART_ITEMS} from '@app/_modules/cart/services/schema';
import {useColorScheme} from 'react-native-appearance';
import {Colors} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import Section from '@app/components/Section';
import styles from '@app/_modules/cart/atoms/CustomInputQty/styles';

/**
 * ----------------------------------------- *
 * CustomInputQuantity
 * it will be rendered only if
 * (modules.cart.atoms.update_item_qty_input.enable)
 * is true (enabled)
 * @param {initialQuantity, cartItemId}
 * ----------------------------------------- *
 */
const CustomInputQty = ({initialQuantity = 0, cartItemId}) => {
  /**
   * ----------------------------------------- *
   * call color hooks fro theme (dark mode)
   * @return color, scheme
   * ----------------------------------------- *
   */
  const scheme = useColorScheme();
  const color = scheme === 'dark' ? Colors.WHITE : Colors.BLACK;

  /**
   * ----------------------------------------- *
   * call cartId from reactive (context)
   * @return cartId
   * ----------------------------------------- *
   */
  const cartId = useReactiveVar(rxCartId);

  /**
   * ----------------------------------------- *
   * call refetch function to UPDATE localstate
   * cart items
   * @return {refetch}
   * ----------------------------------------- *
   */
  const {refetch: refetchCart} = useRefetchCart();

  /**
   * ----------------------------------------- *
   * set initial state for quantity
   * and loading activity
   * @return [quantity, setQuantity]
   * @return [loading, setLoading]
   * ----------------------------------------- *
   */
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);

  /**
   * ----------------------------------------- *
   * call mutation hooks to
   * update cart item qty on database
   * @return [updateCartItemHook]
   * ----------------------------------------- *
   */
  const [updateCartItemHook] = useMutation(UPDATE_CART_ITEMS);

  /**
   * ----------------------------------------- *
   * @function onUpdateCartItem
   * trigger mutation hooks to
   * update cart item qty on database
   * then shows popup notification
   * then renew the data cart items on localstate
   * @return [updateCartItemHook]
   * ----------------------------------------- *
   */
  const onUpdateCartItem = async (variables, type) => {
    try {
      setLoading(true);
      updateCartItemHook({variables}).then(result => {
        refetchCart(result.data.updateCartItems);
        rxAppSnackbar({
          message: 'Cart Item updated',
        });
        setLoading(false);
        type === 'incrase'
          ? setQuantity(quantity + 1)
          : setQuantity(quantity - 1);
      });
    } catch (err) {
      rxAppSnackbar({
        message: 'Something when wrong',
      });
    }
  };

  /**
   * ----------------------------------------- *
   * @function onIncereaseQuantity
   * this function will be called when
   * we incrase the qty of an item on cart page
   * then will trigger onUpdateCartItem
   * function to run which will be update qty
   * item by one up (addition)
   * ----------------------------------------- *
   */
  const onIncereaseQuantity = () => {
    let variables = {
      input: {
        cart_id: cartId,
        cart_items: [
          {
            cart_item_id: cartItemId,
            quantity: quantity !== '' ? quantity + 1 : 1,
          },
        ],
      },
    };

    onUpdateCartItem(variables, 'incrase');
  };

  /**
   * ----------------------------------------- *
   * @function onIncereaseQuantity
   * this function will be called when
   * we incrase the qty of an item on cart page
   * then will trigger onUpdateCartItem
   * function to run which will be update qty
   * item by one down (substraction)
   * ----------------------------------------- *
   */
  const onDecreaseQuantity = () => {
    if (quantity !== '' && parseInt(quantity) > 1) {
      let variables = {
        input: {
          cart_id: cartId,
          cart_items: [
            {
              cart_item_id: cartItemId,
              quantity: quantity - 1,
            },
          ],
        },
      };

      onUpdateCartItem(variables, 'decrase');
    }
  };

  switch (loading) {
    case true:
      return <ActivityIndicator />;
    default:
      return (
        <View style={styles.customInputQty}>
          <Section onPress={onDecreaseQuantity}>
            <Icon name="minuscircleo" size={normalize(20)} color={color} />
          </Section>

          <TextInput
            value={quantity.toString()}
            keyboardType="number-pad"
            editable={false}
            style={[
              styles.quantityInput,
              {
                color: color,
                borderColor: color,
              },
            ]}
          />

          <Section onPress={onIncereaseQuantity}>
            <Icon name="pluscircleo" size={normalize(20)} color={color} />
          </Section>
        </View>
      );
  }
};

export default withProfiler(CustomInputQty, {name: 'CustomInputQty'});
