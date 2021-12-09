import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useReactiveVar} from '@apollo/client';
import {useSentryPerf} from '@app/helpers/Sentry';
import {customUseMutation} from '@app/hooks/customApolloHooks';
import {useRefetchCart} from '@app/hooks/useRefetchCart';
import {rxCartId, rxAppSnackbar} from '@app/services/cache';
import {withProfiler} from '@sentry/react-native';
import {Button} from 'react-native-paper';
import {
  TYPENAME_BUNDLE,
  TYPENAME_CONFIGURABLE,
  TYPENAME_VIRTUAL,
} from '@app/helpers/Constants';
import {
  ADD_BUNDLE_PRODUCT,
  ADD_CONFIGURABLE_PRODUCT,
  ADD_SIMPLE_PRODUCT,
  ADD_VIRTUAL_PRODUCT,
} from '@app/_modules/cart/services/schema';

import Text from '@app/components/Text';
import AnalyticsHelper from '@app/helpers/Analytics';
import QuantityModal from '@app/_modules/cart/atoms/QuantityModal/index';

const AddToCart = ({
  id,
  sku,
  name = '',
  productPrice,
  productCurrency,
  parent_sku,
  type,
  children,
  propStyle = {},
  selectedOptions,
  bundleItemsCount,
  disabled = false,
}) => {
  const cartId = useReactiveVar(rxCartId);
  const {t} = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variables, setVariables] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartHook] = customUseMutation(ADD_SIMPLE_PRODUCT);
  const [addConfigurableToCartHook] = customUseMutation(
    ADD_CONFIGURABLE_PRODUCT,
  );
  const [addBundleToCartHook] = customUseMutation(ADD_BUNDLE_PRODUCT);
  const [addVirtualToCartHook] = customUseMutation(ADD_VIRTUAL_PRODUCT);
  const {refetch: refetchCart} = useRefetchCart();
  const {startTransaction, finishTransaction} = useSentryPerf('Add to cart');

  /**
   * ---------------------------------------------------- *
   * @dependency [cartId, sku, quantity, type]
   * @summary for only set variables for request GQL
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    if (cartId) {
      let variableTmp = {
        input: {
          cart_id: cartId,
          cart_items: [
            {
              data: {
                quantity,
                sku,
              },
            },
          ],
        },
      };

      if (type === TYPENAME_CONFIGURABLE) {
        variableTmp = {
          input: {
            cart_id: cartId,
            cart_items: [
              {
                parent_sku,
                data: {
                  quantity,
                  sku,
                },
              },
            ],
          },
        };
      }

      if (type === TYPENAME_BUNDLE) {
        variableTmp = {
          input: {
            cart_id: cartId,
            cart_items: [
              {
                bundle_options: selectedOptions,
                data: {
                  quantity,
                  sku,
                },
              },
            ],
          },
        };
      }

      if (type === TYPENAME_VIRTUAL) {
        variableTmp = {
          input: {
            cart_id: cartId,
            cart_items: [
              {
                customizable_options: [],
                data: {
                  quantity,
                  sku,
                },
              },
            ],
          },
        };
      }

      setVariables(variableTmp);
    }
  }, [cartId, sku, quantity, type]);

  /**
   * ---------------------------------------------------- *
   * @function addToCart
   * @summary for add item to cart event
   * ---------------------------------------------------- *
   */
  const addToCart = async () => {
    if (quantity > 0) {
      startTransaction(`
        Add to cart mutation ${cartId} 
        ${JSON.stringify(variables)}
        `);

      let gqlReturn;
      setLoading(true);
      try {
        if (type === TYPENAME_CONFIGURABLE) {
          const temp = await addConfigurableToCartHook({variables});
          gqlReturn = temp?.data?.addConfigurableProductsToCart;
        } else if (type === TYPENAME_BUNDLE) {
          if (selectedOptions.length === bundleItemsCount) {
            const temp = await addBundleToCartHook({variables});
            gqlReturn = temp?.data?.addBundleProductsToCart;
          }
        } else if (type === TYPENAME_VIRTUAL) {
          const temp = await addVirtualToCartHook({variables});
          gqlReturn = temp?.data?.addVirtualProductsToCart;
        } else {
          const temp = await addToCartHook({variables});
          gqlReturn = temp?.data?.addSimpleProductsToCart;
        }

        const item = {
          id,
          sku,
          name,
          currency: productCurrency,
          price: productPrice,
        };
        AnalyticsHelper.eventAddItemCart({item, quantity});
        refetchCart(gqlReturn);
        setLoading(false);
        setShowModal(false);
        rxAppSnackbar({
          message: t('cart.add_to_cart.label.productSuccess'),
        });

        finishTransaction();
      } catch (error) {
        console.log('cart add error', error);
        if (error.graphQLErrors[0]) {
          rxAppSnackbar({
            message: error.graphQLErrors[0].message,
          });
        }
        setLoading(false);
        setShowModal(false);

        finishTransaction();
      }
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function onIncreaseQuantity
   * @summary for add +1 quantity product in modal
   * ---------------------------------------------------- *
   */
  const onIncreaseQuantity = () => {
    let newQty = 0;
    if (quantity !== '') {
      newQty = parseInt(quantity) + 1;
    } else {
      newQty = 1;
    }
    setQuantity(newQty);
  };

  /**
   * ---------------------------------------------------- *
   * @function decreaseQuantity
   * @summary for add -1 quantity product in modal
   * ---------------------------------------------------- *
   */
  const onDecreaseQuantity = () => {
    if (quantity !== '' && parseInt(quantity) > 1) {
      const newQty = parseInt(quantity) - 1;
      setQuantity(newQty);
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function renderButtonText
   * @summary for rendering button with text
   * ---------------------------------------------------- *
   */
  const renderButtonText = () => {
    if (children) {
      return children;
    } else {
      return <Text>+</Text>;
    }
  };

  return (
    <>
      <QuantityModal
        visible={showModal}
        name={name}
        quantity={quantity}
        onChangeQuantity={qty => setQuantity(qty)}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        onSubmit={addToCart}
        submitLabel={t('cart.add_to_cart.label.addToCart')}
        loading={loading}
        onBackBackButtonPress={() => setShowModal(false)}
      />
      <Button
        style={[propStyle]}
        onPress={() => {
          if (!disabled) {
            setShowModal(true);
          }
        }}>
        {renderButtonText()}
      </Button>
    </>
  );
};

export default withProfiler(AddToCart, {name: 'AddToCart'});
