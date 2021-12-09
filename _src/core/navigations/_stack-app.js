import React from 'react';
import {modules, tabsApp} from '@root/swift.config';
import {Stack} from '@app/navigations';

import AccountAboutUs from '@app/_modules/account_about_us';
import AccountChangePassword from '@app/_modules/account_change_password';
import AccountStoreCredit from '@app/_modules/account_storecredit';
import AccountConfirmPayment from '@app/_modules/account_confirm_payment';
import AccountContactUs from '@app/_modules/account_contact_us';
import AccountGiftCard from '@app/_modules/account_gift_card';
import AccountHelp from '@app/_modules/account_help';
import AccountLanguages from '@app/_modules/account_languages';
import AccountMyAccount from '@app/_modules/account_myaccount';
import AccountAddAddress from '@app/_modules/account_add_address';
import AccountEditAddress from '@app/components/UpdateAddress';
import AccountMyReturn from '@app/_modules/account_myreturn';
import AccountMyReturnDetail from '@app/_modules/account_myreturn_detail';
import AccountNotification from '@app/_modules/account_notification';
import AccountNotificationDetail from '@app/_modules/account_notification_detail';
import AccountPurchases from '@app/_modules/account_purchases';
import AccountPurchasesDetail from '@app/_modules/account_purchases_detail';
import AccountReturns from '@app/_modules/account_returns';
import AccountRewardPoint from '@app/_modules/account_rewardpoint';
import AccountSettings from '@app/_modules/account_settings';
import AccountTrackOrder from '@app/_modules/account_trackorder';
import AccountUpdateInformation from '@app/_modules/account_update_information';
import CartOneStepCheckout from '@app/_modules/cart_onestepcheckout';
import CartPayment from '@app/_modules/cart_payment';
import CartShipping from '@app/_modules/cart_shipping';
import CartThankYou from '@app/_modules/cart_thankyou';
import BlogDetail from '@app/_modules/blog_detail';
import BlogList from '@app/_modules/blog_list';
import MainSearch from '@app/_modules/main_search';
import ProductDetail from '@app/_modules/product_detail';
import ProductList from '@app/_modules/product_list';

import TabStackApp from '@app/navigations/_stack-app-tab';

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const StackApp = () => {
  return (
    <>
      <Stack.Screen
        key={tabsApp.name}
        name={tabsApp.name}
        component={TabStackApp}
      />
      <Stack.Screen
        key={modules.account_about_us.name}
        name={modules.account_about_us.name}
        component={AccountAboutUs}
      />
      <Stack.Screen
        key={modules.account_change_password.name}
        name={modules.account_change_password.name}
        component={AccountChangePassword}
      />
      <Stack.Screen
        key={modules.account_confirm_payment.name}
        name={modules.account_confirm_payment.name}
        component={AccountConfirmPayment}
      />
      <Stack.Screen
        key={modules.account_contact_us.name}
        name={modules.account_contact_us.name}
        component={AccountContactUs}
      />
      <Stack.Screen
        key={modules.account_gift_card.name}
        name={modules.account_gift_card.name}
        component={AccountGiftCard}
      />
      <Stack.Screen
        key={modules.account_help.name}
        name={modules.account_help.name}
        component={AccountHelp}
      />
      <Stack.Screen
        key={modules.account_languages.name}
        name={modules.account_languages.name}
        component={AccountLanguages}
      />
      <Stack.Screen
        key={modules.account_myaccount.name}
        name={modules.account_myaccount.name}
        component={AccountMyAccount}
      />
      <Stack.Screen
        key={modules.account_address_add.name}
        name={modules.account_address_add.name}
        component={AccountAddAddress}
      />
      <Stack.Screen
        key={modules.account_address_edit.name}
        name={modules.account_address_edit.name}
        component={AccountEditAddress}
      />
      <Stack.Screen
        key={modules.account_storecredit.name}
        name={modules.account_storecredit.name}
        component={AccountStoreCredit}
      />
      <Stack.Screen
        key={modules.account_myreturn.name}
        name={modules.account_myreturn.name}
        component={AccountMyReturn}
      />
      <Stack.Screen
        key={modules.account_myreturn_detail.name}
        name={modules.account_myreturn_detail.name}
        component={AccountMyReturnDetail}
      />
      <Stack.Screen
        key={modules.account_notification.name}
        name={modules.account_notification.name}
        component={AccountNotification}
      />
      <Stack.Screen
        key={modules.account_notification_detail.name}
        name={modules.account_notification_detail.name}
        component={AccountNotificationDetail}
      />
      <Stack.Screen
        key={modules.account_purchases.name}
        name={modules.account_purchases.name}
        component={AccountPurchases}
      />
      <Stack.Screen
        key={modules.account_purchases_detail.name}
        name={modules.account_purchases_detail.name}
        component={AccountPurchasesDetail}
      />
      <Stack.Screen
        key={modules.account_returns.name}
        name={modules.account_returns.name}
        component={AccountReturns}
      />
      <Stack.Screen
        key={modules.account_rewardpoint.name}
        name={modules.account_rewardpoint.name}
        component={AccountRewardPoint}
      />
      <Stack.Screen
        key={modules.account_settings.name}
        name={modules.account_settings.name}
        component={AccountSettings}
      />
      <Stack.Screen
        key={modules.account_trackorder.name}
        name={modules.account_trackorder.name}
        component={AccountTrackOrder}
      />
      <Stack.Screen
        key={modules.account_update_information.name}
        name={modules.account_update_information.name}
        component={AccountUpdateInformation}
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
        key={modules.main_search.name}
        name={modules.main_search.name}
        component={MainSearch}
        options={{cardStyleInterpolator: forFade}}
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
    </>
  );
};
