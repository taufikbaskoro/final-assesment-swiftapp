import {useReactiveVar} from '@apollo/client';
import React from 'react';
import {withProfiler} from '@sentry/react-native';
import {rxUserType, rxUserWIshlistItems} from '@app/services/cache';
import {navigateTo} from '@app/helpers/Navigation';

import Views from '@app/_modules/account_wishlist/_view';
import ViewLogin from '@app/_modules/auth_signin/_controller';
import {modules} from '@root/swift.config';
import {USER_GUEST} from '@app/helpers/Constants';

const Wishlist = () => {
  if (!modules.account_wishlist.enable) {
    return null;
  }

  const userType = useReactiveVar(rxUserType);
  const wishlist = useReactiveVar(rxUserWIshlistItems);

  const onNavigateToProductDetail = productUrlKey => {
    navigateTo(
      modules.product_detail.enable,
      modules.product_detail.name,
      productUrlKey,
    );
  };

  const onNavigateToAccount = () => {
    navigateTo(modules.account.enable, modules.account.name);
  };

  if (userType === USER_GUEST) {
    return <ViewLogin />;
  }
  return (
    <Views
      userType={userType}
      wishlist={wishlist}
      onNavigateToAccount={onNavigateToAccount}
      onNavigateToProductDetail={onNavigateToProductDetail}
    />
  );
};

export default withProfiler(Wishlist, {name: 'Wishlist'});
