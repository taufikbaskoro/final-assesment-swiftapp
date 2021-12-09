import React, {useEffect, useState} from 'react';
import {useMutation, useReactiveVar} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {UPDATE_CART_ITEMS} from '@app/_modules/cart/services/schema';
import {rxCartId, rxAppSnackbar} from '@app/services/cache';
import {useRefetchCart} from '@app/hooks/useRefetchCart';

import QuantityModal from '@app/_modules/cart/atoms/QuantityModal';
import Text from '@app/components/Text';
import Section from '@app/components/Section';

const UpdateCartItem = ({
  cartItemId,
  initialQuantity = 0,
  name = '',
  children,
  propStyle = {},
}) => {
  const cartId = useReactiveVar(rxCartId);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState({});
  const [quantity, setQuantity] = useState(0);

  const [updateCartItemHook] = useMutation(UPDATE_CART_ITEMS);

  const {refetch: refetchCart} = useRefetchCart();

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  useEffect(() => {
    if (cartId) {
      setVariables({
        input: {
          cart_id: cartId,
          cart_items: [
            {
              cart_item_id: cartItemId,
              quantity,
            },
          ],
        },
      });
    }
  }, [cartId, cartItemId, quantity]);

  const updateCartItem = async () => {
    if (quantity > 0) {
      setLoading(true);
      const gqlReturn = await updateCartItemHook({variables});
      try {
        refetchCart(gqlReturn.data.updateCartItems);
        rxAppSnackbar({
          message: 'Cart Item updated',
        });
        setLoading(false);
        setShowModal(false);
      } catch (error) {
        // console.log(error);
        rxAppSnackbar({
          message: 'Something went wrong',
        });
        setLoading(false);
        setShowModal(false);
      }
    }
  };

  const incereaseQuantity = () => {
    let newQty = 0;
    if (quantity !== '') {
      newQty = parseInt(quantity) + 1;
    } else {
      newQty = 1;
    }
    setQuantity(newQty);
  };

  const decreaseQuantity = () => {
    if (quantity !== '' && parseInt(quantity) > 1) {
      const newQty = parseInt(quantity) - 1;
      setQuantity(newQty);
    }
  };

  const renderButtonText = () => {
    if (children) {
      return children;
    } else {
      return <Text>Update</Text>;
    }
  };

  return (
    <>
      <QuantityModal
        visible={showModal}
        name={name}
        quantity={quantity}
        onChangeQuantity={qty => setQuantity(qty)}
        onIncreaseQuantity={incereaseQuantity}
        onDecreaseQuantity={decreaseQuantity}
        onSubmit={updateCartItem}
        submitLabel="Update Quantity"
        loading={loading}
        onBackBackButtonPress={() => setShowModal(false)}
      />
      <Section onPress={() => setShowModal(true)} style={propStyle}>
        {renderButtonText()}
      </Section>
    </>
  );
};

export default withProfiler(UpdateCartItem, {name: 'UpdateCartItem'});
