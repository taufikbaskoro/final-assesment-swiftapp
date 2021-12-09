import {loadingStop} from '@app/helpers/General';

import {useEffect, useMemo, useState} from 'react';

import {customUseLazyQuery} from '@app/hooks/customApolloHooks';
import {rxUserWIshlistItems} from '@app/services/cache';
import {GET_USER_WISHLIST} from '@app/services/queries/user';

export function useRefetchWishlist() {
  const [userDataParams, setUserDataParams] = useState(null);
  const [loadUserData, userData] = customUseLazyQuery(GET_USER_WISHLIST, {
    fetchPolicy: 'network-only',
  });

  /**
   * ---------------------------------------------------- *
   * @dependency [userDataParams, userData]
   * @summary set wishlist data to useMemo const
   * ---------------------------------------------------- *
   */
  const userDataState = useMemo(() => {
    if (userDataParams) {
      return userDataParams;
    }
    if (userData?.data) {
      return userData.data;
    }
    return null;
  }, [userDataParams, userData]);

  /**
   * ---------------------------------------------------- *
   * @function refetch
   * @param Object wishlist
   * @summary set data to local state or get from remote
   * ---------------------------------------------------- *
   */
  const refetch = async userDataParam => {
    if (userDataParam) {
      setUserDataParams(userDataParam);
    } else {
      try {
        await loadUserData();
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  /**
   * ---------------------------------------------------- *
   * @dependency [userDataState]
   * @summary populate wishlist item and set to reactive
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    if (userDataState && userDataState?.customer?.wishlist) {
      const wishlist = userDataState?.customer?.wishlist?.items;
      const wishlistState = [];
      wishlist?.map(item => {
        const {id, name, thumbnail, url_key, price_range} = item.product;

        wishlistState.push({
          wishlistId: item.id,
          productId: id,
          name: name,
          image: thumbnail.url,
          url_key: url_key,
          price: price_range.maximum_price.final_price.value,
          __typename: 'WishlistItem',
        });
      });

      rxUserWIshlistItems(wishlistState);
      loadingStop();
    }
  }, [userDataState]);

  return {refetch};
}
