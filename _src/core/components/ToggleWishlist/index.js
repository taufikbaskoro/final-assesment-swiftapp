import {useMutation} from '@apollo/client';
import AnalyticsHelper from '@app/helpers/Analytics';
import {loadingStart, loadingStop} from '@app/helpers/General';
import {useRefetchWishlist} from '@app/hooks/useRefetchWishlist';
import {Colors} from '@app/styles';

import React from 'react';
import {useColorScheme} from 'react-native-appearance';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {withProfiler} from '@sentry/react-native';

import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '@app/_modules/account_wishlist/services/schema';

const ToggleWishlist = ({
  productId,
  productName,
  productSku,
  productCurrency,
  productPrice,
  wishlistItemId = null,
  children,
  styleProp = {},
  iconSize = 25,
  callback = null,
}) => {
  const scheme = useColorScheme();

  const [addToWishlistHook] = useMutation(ADD_TO_WISHLIST);
  const [removeFromWishlistHook] = useMutation(REMOVE_FROM_WISHLIST);
  const {refetch} = useRefetchWishlist();
  console.log(styleProp);

  /**
   * ---------------------------------------------------- *
   * @function onLogWishlistToAnalytics
   * @summary log add/remove wishlist item to analytics
   * @profiler {googleAnalytics} wishlist
   * ---------------------------------------------------- *
   */
  const onLogWishlistToAnalytics = () => {
    const item = {
      item_name: productName,
      item_sku: productSku,
      value: productPrice,
      currency: productCurrency,
    };
    if (wishlistItemId) {
      AnalyticsHelper.eventAddItemWishlist({item});
    } else {
      AnalyticsHelper.eventRemoveItemWishlist({item});
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function onAddToWishlist
   * @summary add product to wishlist and refetch list
   * ---------------------------------------------------- *
   */
  const onAddToWishlist = async () => {
    loadingStart();
    try {
      await addToWishlistHook({
        variables: {
          productId: productId,
        },
      });
      onLogWishlistToAnalytics();
      await refetch();
      if (callback) {
        await callback();
      }
    } catch (error) {
      // console.log(error);
      loadingStop();
    }
  };

  /**
   * ---------------------------------------------------- *
   * @function onRemoveFromWishlist
   * @summary remove product to wishlist and refetch list
   * ---------------------------------------------------- *
   */
  const onRemoveFromWishlist = async () => {
    loadingStart();

    try {
      await removeFromWishlistHook({
        variables: {
          wishlistItemId: wishlistItemId,
        },
      });
      onLogWishlistToAnalytics();
      await refetch();
      if (callback) {
        await callback();
      }
    } catch (error) {
      // console.log(error);
      loadingStop();
    }
  };

  return (
    <Section
      style={[styleProp]}
      onPress={wishlistItemId ? onRemoveFromWishlist : onAddToWishlist}>
      <RenderIf radius={25} padding border condition={!children}>
        <FontAwesomeIcons
          name={wishlistItemId ? 'heart' : 'heart-o'}
          size={iconSize}
          color={
            wishlistItemId
              ? Colors.PRIMARY
              : scheme === 'dark'
              ? Colors.GRAY_DARK
              : Colors.BLACK
          }
        />
      </RenderIf>
      <RenderIf condition={children}>
        <Section>{children}</Section>
      </RenderIf>
    </Section>
  );
};

export default withProfiler(ToggleWishlist, {name: 'ToggleWishlist'});
