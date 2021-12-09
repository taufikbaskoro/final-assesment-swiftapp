import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {RemoveFromCartButton, UpdateCartItemModal} from '@app/_modules/cart';
import CustomInputQty from '@app/_modules/cart/atoms/CustomInputQty/index';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';

import ToggleWishlist from '@app/components/ToggleWishlist';
import Button from '@app/components/Button';
import NavBar from '@app/components/NavBar';
import Text from '@app/components/Text';
import Section from '@app/components/Section';

import FastImage from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import styles from '@app/_modules/cart/styles';
import {modules} from '@root/swift.config';

export const WishListButton = props => {
  return <ToggleWishlist {...props} />;
};

function CartScreen({
  subTotal,
  cart: cartProp,
  onNavigateToProductDetail,
  onNavigateToShipping,
  userType,
}) {
  const [cart, setCart] = useState(cartProp);
  /**
   * ----------------------------------------- *
   * @dependency [cartProp]
   * @summary set cart remote to local
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (cartProp) {
      const newCart = [...cartProp];
      setCart(newCart);
    }
  }, [cartProp]);

  /**
   * ----------------------------------------- *
   * @function onRenderItem
   * @summary render cart item list
   * @return Component cart item
   * ----------------------------------------- *
   */
  const onRenderItem = ({item}) => {
    return (
      <Section
        flex
        row
        centerChildren
        hpadding={normalize(20)}
        vmargin={5}
        style={styles.cartItemContainer}>
        <Section
          alignStart
          flex={2}
          vpadding
          onPress={() => onNavigateToProductDetail(item.url_key)}>
          {item.image ? (
            <FastImage
              key={item.url_key}
              style={styles.cartItemImage}
              source={{
                uri: item.image,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <Section
              width={Mixins.MAX_WIDTH * 0.3}
              height={normalize(150)}
              backgroundColor={Colors.GRAY_LIGHT}
            />
          )}
        </Section>
        <Section flex={3} alignStart justifyCenter>
          <Text style={styles.cartItemDetailText}>{item.name}</Text>
          <Text style={styles.cartItemDetailText}>Qty: {item.quantity}</Text>
          <Text bold style={[styles.cartItemDetailText]}>
            IDR {item.price}
          </Text>

          <Section
            row
            width={normalize(100)}
            spaceBetween
            vmargin={15}
            alignCenter>
            {userType === 'customer' && (
              <WishListButton
                productId={item.productId}
                wishlistItemId={item.wishlistId}
                productName={item.name}
                productSku={item.sku}
                productPrice={
                  item.price_range === undefined
                    ? item.price
                    : item.price_range.maximum_price.final_price.value
                }
                productCurrency={
                  item.price_range === undefined
                    ? item.currency
                    : item.price_range.maximum_price.final_price.currency
                }
                styleProp={styles.wishlistIcon}
                iconSize={normalize(15)}
              />
            )}

            {modules.cart.atoms.update_item_qty_modal.enable && (
              <UpdateCartItemModal
                name={item.name}
                cartItemId={item.cartItemId}
                initialQuantity={item.quantity}
                propStyle={styles.cartItemActionIcon}>
                <SimpleLineIcons name="pencil" size={normalize(15)} />
              </UpdateCartItemModal>
            )}

            {modules.cart.atoms.update_item_qty_input.enable && (
              <CustomInputQty
                initialQuantity={item.quantity}
                cartItemId={item.cartItemId}
              />
            )}

            <RemoveFromCartButton
              cartItemId={item.cartItemId}
              product={{
                currency:
                  item.price_range === undefined
                    ? item.currency
                    : item.price_range.maximum_price.final_price.currency,
                price:
                  item.price_range === undefined
                    ? item.price * item.quantity
                    : item.price_range.maximum_price.final_price.value *
                      item.quantity,
                id: item.productId,
                name: item.name,
                sku: item.sku,
              }}
              propStyle={styles.cartItemActionIcon}>
              <SimpleLineIcons name="trash" size={normalize(15)} />
            </RemoveFromCartButton>
          </Section>
        </Section>
      </Section>
    );
  };

  /**
   * ----------------------------------------- *
   * @component SubTotal
   * @profiler {Sentry}
   * @summary Text Component for display price
   * @returns Components
   * ----------------------------------------- *
   */
  const SubTotal = withProfiler(
    () => (
      <Section
        centerChildren
        width={Mixins.MAX_WIDTH}
        height={normalize(50)}
        style={styles.subTotalSubContainer}>
        <Text bold primary>
          {subTotal && typeof subTotal?.value === 'number'
            ? `Subtotal ${'\n'}${subTotal?.currency} ${subTotal?.value}`
            : 'Loading'}
        </Text>
      </Section>
    ),
    {name: 'SubTotal'},
  );

  return (
    <>
      <NavBar title="Cart" />
      <FlatList
        style={styles.listContainer}
        data={cart}
        renderItem={onRenderItem}
        keyExtractor={item => item.cartItemId.toString()}
        ListEmptyComponent={
          cart === undefined || cart === null ? (
            <ActivityIndicator />
          ) : (
            <Text center>No Data</Text>
          )
        }
      />
      <View style={{flexDirection: 'row'}}>
        <SubTotal />
        <Button
          disabled={!cart?.length}
          onPress={onNavigateToShipping}
          label="Checkout"
          textStyleProp={styles.checkOutButtonText}
          loading={cart === undefined || cart === null}
          styleProp={[
            styles.checkOutButtonContainer,
            !cart?.length && {backgroundColor: Colors.GRAY_DARK},
          ]}
        />
      </View>
    </>
  );
}

export default withProfiler(CartScreen, {name: 'CartScreen'});
