import React, {useEffect, useState} from 'react';
import {compareSkus} from '@app/helpers/General';
import {customUseQuery} from '@app/hooks/customApolloHooks';
import {rxUserType, rxUserWIshlistItems} from '@app/services/cache';
import {useRefetchWishlist} from '@app/hooks/useRefetchWishlist';
import {useReactiveVar} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {modules} from '@root/swift.config';
import {TYPENAME_CONFIGURABLE} from '@app/helpers/Constants';
import {useTranslation} from 'react-i18next';

import {
  GET_PRODUCT_BY_URL_KEY,
  GET_PRODUCT_REVIEWS,
} from '@app/_modules/product_detail/services/schema';

import AnalyticsHelper from '@app/helpers/Analytics';
import Views from '@app/_modules/product_detail/_view';

const Controller = props => {
  if (!modules.product_detail.enable) {
    return null;
  }

  /**
   * ---------------------------------------------------- *
   * @const {hooks}
   * ---------------------------------------------------- *
   */
  const userType = useReactiveVar(rxUserType);
  const wishlist = useReactiveVar(rxUserWIshlistItems);
  const {t} = useTranslation();
  const {refetch: refetchWishlist} = useRefetchWishlist();
  const {productUrlKey} = props.route.params;
  const [product, setProduct] = useState({});
  const {data, loading} = customUseQuery(GET_PRODUCT_BY_URL_KEY, {
    variables: {
      url_key: productUrlKey,
      currentPage: 1,
      pageSize: 1,
      sortBy: {price: 'ASC'},
    },
  });
  const {data: productReviewsData, refetch: refetchProductReviews} =
    customUseQuery(GET_PRODUCT_REVIEWS, {
      variables: {
        sku: product.sku,
        currentPage: 1,
        pageSize: 6,
      },
    });

  const productReviews = productReviewsData?.getProductReviews?.items || [];
  const totalReview = productReviewsData?.getProductReviews?.totalCount || 0;
  const isProductReady = Object.keys(product).length > 0;
  const [imageUrl, setImageUrl] = useState(product.image);
  const [skuProduct, setSkuProduct] = useState(product.sku);
  const [visibleImageView, setVisibleImageView] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [stockStatus, setStockStatus] = useState(product.stock_status);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [bundleItemsCount, setBundleItemsCount] = useState(0);

  const getPriceRange = product?.price_range;
  const getMaxPrice = getPriceRange?.maximum_price;
  const getPriceCurrency = getMaxPrice?.final_price.currency;
  const getPriceRegularValue = getMaxPrice?.regular_price.value;
  const getPriceFinalValue = getMaxPrice?.final_price.value;
  const getDiscountPercent = getMaxPrice?.discount?.percent_off;
  const isSamePrice = getPriceRegularValue === getPriceFinalValue;

  /**
   * ---------------------------------------------------- *
   * @dependency [data, wishlist]
   * @summary for checking wishlist data
   * @todo : check on each variant stock
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    if (data) {
      let productTmp = data.products.items[0];
      let wishlistId = null;
      if (wishlist) {
        wishlist.forEach(wishlistItem => {
          if (wishlistItem.productId === productTmp.id) {
            wishlistId = wishlistItem.wishlistId;
          }
        });
      }
      productTmp = {...productTmp, wishlistId};
      setProduct(productTmp);
    }
  }, [data, wishlist]);

  /**
   * ----------------------------------------- *
   * @function onLogProductToAnalytics
   * @summary log product detail to analytics
   * @profiler {googleAnalytics} PDP
   * ----------------------------------------- *
   */
  const onLogProductToAnalytics = () => {
    const {id, sku, name} = product;
    let item = {
      id,
      sku,
      name,
      currency: getPriceCurrency,
      price: getPriceFinalValue,
    };
    AnalyticsHelper.eventViewItem({item});
  };

  /**
   * ---------------------------------------------------- *
   * @function onItemClickPreviewImage
   * @param {object} status
   * @summary for event click image preview
   * ---------------------------------------------------- *
   */
  const onItemClickPreviewImage = status => {
    if (product.image) {
      setVisibleImageView(status);
    }
  };

  /**
   * ----------------------------------------- *
   * @dependency [sku]
   * @summary set image and stock status for
   * configurable product or simple product
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (skuProduct) {
      if (product?.__typename === TYPENAME_CONFIGURABLE) {
        product?.variants?.map(async variant => {
          if (compareSkus(variant.product.sku, skuProduct)) {
            await setImageUrl(variant.product.image.url);
            await setStockStatus(variant.product.stock_status);
          }
        });
      } else {
        setStockStatus(product.stock_status);
      }
    }
  }, [skuProduct]);

  /**
   * ----------------------------------------- *
   * @dependency [product?.sku]
   * @summary set sku from props to local state
   * ----------------------------------------- *
   */
  useEffect(() => {
    if (product?.sku) {
      setSkuProduct(product?.sku);
      onLogProductToAnalytics();
    }
  }, [product?.sku]);

  /**
   * ---------------------------------------------------- *
   * @constant controllerProps
   * @return {object}
   * ---------------------------------------------------- *
   */
  const controllerProps = {
    ...props,
    t,
    loading,
    product,
    userType,
    productReviews,
    totalReview,
    refetchProductReviews,

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
    refetchWishlist,
    onItemClickPreviewImage,
    setVisibleImageView,
    setSelectedColor,
    setSelectedSize,
    setSelectedOptions,
    setBundleItemsCount,
  };

  return <Views {...controllerProps} />;
};

export default withProfiler(Controller, {name: 'ProductDetail'});
