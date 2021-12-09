import React from 'react';
import {Capitalize} from '@app/helpers/General';
import {Colors, Mixins} from '@app/styles';
import {normalize} from '@app/styles/mixins';
import {withProfiler} from '@sentry/react-native';
import {ScrollView} from 'react-native';
import {
  Text,
  ActivityIndicator,
  Colors as ColorsPaper,
} from 'react-native-paper';
import {AddToCartButton} from '@app/_modules/cart/index';
import {modules} from '@root/swift.config';
import {
  IN_STOCK,
  TYPENAME_BUNDLE,
  TYPENAME_CONFIGURABLE,
  USER_GUEST,
} from '@app/helpers/Constants';

import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';

import RenderIf from '@app/components/RenderIf/index';
import Loader from '@app/components/Loader/index';
import Section from '@app/components/Section/index';
import SocialShareBlock from '@app/components/SocialShareBlock/index';
import BundleProduct from '@app/_modules/product_detail/atoms/BundleProduct';
import ConfigurableOptions from '@app/_modules/product_detail/atoms/ConfigurableOptions';
import ProductDetailBlock from '@app/_modules/product_detail/atoms/ProductDetailBlock/index';
import ToggleWishlist from '@app/components/ToggleWishlist';
import styles from '@app/_modules/product_detail/styles';
import NavBar from '@app/components/NavBar/index';

export const WishListButton = props => {
  return <ToggleWishlist {...props} />;
};

const ProductDetailScreen = ({
  t,
  loading,
  product,
  userType,
  productReviews,
  totalReview,
  refetchProductReviews,
  refetchWishlist,

  getPriceRange,
  getPriceCurrency,
  getPriceRegularValue,
  getPriceFinalValue,
  getDiscountPercent,
  isSamePrice,

  isProductReady,
  imageUrl,
  skuProduct,
  visibleImageView,
  selectedColor,
  selectedSize,
  stockStatus,
  selectedOptions,
  bundleItemsCount,
  setSkuProduct,
  onItemClickPreviewImage,
  setSelectedColor,
  setSelectedSize,
  setSelectedOptions,
  setBundleItemsCount,
}) => {
  /**
   * ----------------------------------------- *
   * @component PriceRow
   * @param {Object} product attributes
   * @profiler {Sentry}
   * @summary Section price on PDP
   * @returns Components
   * ----------------------------------------- *
   */
  const PriceRow = withProfiler(
    () => {
      return (
        <Section row vmargin>
          <RenderIf condition={getDiscountPercent > 0}>
            <Section
              width={normalize(40)}
              height={normalize(40)}
              border
              radius={5}
              centerChildren
              hmargin>
              <Text small>{getDiscountPercent}</Text>
              <Text small>Off</Text>
            </Section>
          </RenderIf>

          <RenderIf condition={getPriceRange}>
            <Section alignStart>
              <RenderIf condition={!isSamePrice}>
                <Text lineThrough small>
                  {getPriceCurrency}
                  {getPriceRegularValue?.toFixed(2)}
                </Text>
              </RenderIf>
              <Text large bold>
                {getPriceCurrency}
                {getPriceFinalValue?.toFixed(2)}
              </Text>
            </Section>
          </RenderIf>
        </Section>
      );
    },
    {name: 'PriceRow'},
  );

  return (
    <>
      <NavBar useBack />
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Loader loading={loading} />
        <RenderIf condition={!loading}>
          <Section flex alignStart>
            <Section
              centerChildren
              onPress={() => onItemClickPreviewImage(true)}>
              <RenderIf condition={product.image}>
                <FastImage
                  key={skuProduct}
                  style={styles.productImage}
                  resizeMode={FastImage.resizeMode.contain}
                  source={{
                    uri: imageUrl,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable,
                  }}
                />
              </RenderIf>
              <RenderIf condition={!product.image}>
                <Section flex centerChildren maxWidth>
                  <ActivityIndicator />
                </Section>
              </RenderIf>
            </Section>

            <Text style={styles.productName}>{Capitalize(product.name)}</Text>
            <Section vmargin>
              <Section width={Mixins.MAX_WIDTH} row spaceBetween hpadding2>
                <PriceRow />
                <Section row>
                  <RenderIf
                    condition={
                      modules.product_detail.atoms.social_share.enable
                    }>
                    <SocialShareBlock
                      url={`${Config.PWA_BASE_URL}/${product.url_key}`}
                      title={product.name}
                      message={t('product_detail.kindlyCheck')}
                    />
                  </RenderIf>
                  <RenderIf condition={userType !== USER_GUEST}>
                    <WishListButton
                      productId={product.id}
                      wishlistItemId={product.wishlistId}
                      productName={product.name}
                      productSku={product.sku}
                      productCurrency={isProductReady ? getPriceCurrency : ''}
                      productPrice={isProductReady ? getPriceFinalValue : 0}
                    />
                  </RenderIf>
                </Section>
              </Section>
            </Section>

            <ProductDetailBlock
              product={product}
              productReviews={productReviews}
              totalReview={totalReview}
              refetchProductReviews={refetchProductReviews}
            />

            <RenderIf condition={product.__typename === TYPENAME_CONFIGURABLE}>
              <ConfigurableOptions
                product={product}
                setSku={setSkuProduct}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                setSelectedColor={setSelectedColor}
                setSelectedSize={setSelectedSize}
              />
            </RenderIf>

            <RenderIf condition={product.__typename === TYPENAME_BUNDLE}>
              <BundleProduct
                product={product}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                setBundleItemsCount={setBundleItemsCount}
              />
            </RenderIf>

            <Section centerChildren width={Mixins.MAX_WIDTH} vmargin2>
              <AddToCartButton
                type={product.__typename}
                id={isProductReady ? product.id : null}
                name={product.name}
                productPrice={isProductReady ? getPriceFinalValue : 0}
                productCurrency={isProductReady ? getPriceCurrency : ''}
                propStyle={styles.addToCartButtonContainer}
                selectedOptions={selectedOptions}
                bundleItemsCount={bundleItemsCount}
                disabled={stockStatus !== IN_STOCK}
                sku={
                  product.__typename === TYPENAME_CONFIGURABLE
                    ? skuProduct
                    : product.sku
                }>
                <Text style={{color: ColorsPaper.white, margin: normalize(10)}}>
                  {stockStatus !== IN_STOCK
                    ? t('product_detail.oos')
                    : t('product_detail.addToCart')}
                </Text>
              </AddToCartButton>
            </Section>
          </Section>
        </RenderIf>

        <ImageView
          images={[{uri: imageUrl}]}
          imageIndex={0}
          visible={visibleImageView}
          onRequestClose={() => onItemClickPreviewImage(false)}
          FooterComponent={() => (
            <RenderIf condition={userType !== USER_GUEST}>
              <WishListButton
                styleProp={{
                  backgroundColor: Colors.BLACK,
                }}
                productId={product.id}
                wishlistItemId={product.wishlistId}
                productName={product.name}
                productSku={product.sku}
                productPrice={isProductReady ? getPriceFinalValue : 0}
                productCurrency={isProductReady ? getPriceFinalValue : ''}
                callback={refetchWishlist}>
                <Section
                  centerChildren
                  padding
                  maxWidth
                  backgroundColor={Colors.BLACK}>
                  <Section
                    backgroundColor={Colors.PRIMARY}
                    width={normalize(200)}
                    centerChildren
                    vpadding
                    hpadding2
                    radius={5}
                    vmargin2>
                    <Text white bold>
                      {product.wishlistId
                        ? t('product_detail.removeWishlist')
                        : t('product_detail.addWishlist')}
                    </Text>
                  </Section>
                </Section>
              </WishListButton>
            </RenderIf>
          )}
        />
      </ScrollView>
    </>
  );
};

export default withProfiler(ProductDetailScreen, {name: 'ProductDetailScreen'});
