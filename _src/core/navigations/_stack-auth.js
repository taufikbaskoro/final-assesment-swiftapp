import React from 'react';
import {modules, tabsApp} from '@root/swift.config';
import {Stack} from '@app/navigations';

import AuthLanding from '@app/_modules/auth_landing';
import AuthLogin from '@app/_modules/auth_signin';
import AuthRegister from '@app/_modules/auth_signup';
import TabStackApp from '@app/navigations/_stack-app-tab';
import BlogDetail from '@app/_modules/blog_detail';
import BlogList from '@app/_modules/blog_list';
import ProductDetail from '@app/_modules/product_detail';
import ProductList from '@app/_modules/product_list';
import MainSearch from '@app/_modules/main_search';
import CartOneStepCheckout from '@app/_modules/cart_onestepcheckout';
import CartPayment from '@app/_modules/cart_payment';
import CartShipping from '@app/_modules/cart_shipping';
import CartThankYou from '@app/_modules/cart_thankyou';
import AccountAddAddress from '@app/_modules/account_add_address';

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const StackAuth = () => {
  return (
    <>
      <Stack.Screen
        key={modules.auth_landing.name}
        name={modules.auth_landing.name}
        component={AuthLanding}
      />
      <Stack.Screen
        key={modules.auth_signin.name}
        name={modules.auth_signin.name}
        component={AuthLogin}
      />
      <Stack.Screen
        key={modules.auth_signup.name}
        name={modules.auth_signup.name}
        component={AuthRegister}
      />
      <Stack.Screen
        key={tabsApp.name}
        name={tabsApp.name}
        component={TabStackApp}
      />
      <Stack.Screen
        key={modules.main_search.name}
        name={modules.main_search.name}
        component={MainSearch}
        options={{cardStyleInterpolator: forFade}}
      />
      <Stack.Screen
        key={modules.blog_detail.name}
        name={modules.blog_detail.name}
        component={BlogDetail}
      />
      <Stack.Screen
        key={modules.blog_list.name}
        name={modules.blog_list.name}
        component={BlogList}
      />
      <Stack.Screen
        key={modules.product_detail.name}
        name={modules.product_detail.name}
        component={ProductDetail}
      />
      <Stack.Screen
        key={modules.product_list.name}
        name={modules.product_list.name}
        component={ProductList}
      />
      <Stack.Screen
        key={modules.cart_onestepcheckout.name}
        name={modules.cart_onestepcheckout.name}
        component={CartOneStepCheckout}
      />
      <Stack.Screen
        key={modules.cart_payment.name}
        name={modules.cart_payment.name}
        component={CartPayment}
      />
      <Stack.Screen
        key={modules.cart_shipping.name}
        name={modules.cart_shipping.name}
        component={CartShipping}
      />
      <Stack.Screen
        key={modules.cart_thankyou.name}
        name={modules.cart_thankyou.name}
        component={CartThankYou}
      />
      <Stack.Screen
        key={modules.account_address_add.name}
        name={modules.account_address_add.name}
        component={AccountAddAddress}
      />
    </>
  );
};
