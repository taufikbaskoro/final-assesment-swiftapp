import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

export const accountMenu = [
  {
    label: 'Address Information',
    icon: 'user',
    show: modules.account_myaccount.enable,
    navigation: () =>
      navigateTo(
        modules.account_myaccount.enable,
        modules.account_myaccount.name,
      ),
  },
  {
    label: 'Purchases',
    icon: 'archive',
    show: modules.account_purchases.enable,
    navigation: () =>
      navigateTo(
        modules.account_purchases.enable,
        modules.account_purchases.name,
      ),
  },
  {
    label: 'Store Credit & Refund',
    icon: 'credit-card',
    show: modules.account_storecredit.enable,
    navigation: () =>
      navigateTo(
        modules.account_storecredit.enable,
        modules.account_storecredit.name,
      ),
  },
  {
    label: 'Reward Points',
    icon: 'award',
    show: modules.account_rewardpoint.enable,
    navigation: () =>
      navigateTo(
        modules.account_rewardpoint.enable,
        modules.account_rewardpoint.name,
      ),
  },
  {
    label: 'Gift Card',
    icon: 'gift',
    show: modules.account_gift_card.enable,
    navigation: () =>
      navigateTo(
        modules.account_gift_card.enable,
        modules.account_gift_card.name,
      ),
  },
  {
    label: 'Wishlist',
    icon: 'heart',
    show: modules.account_wishlist.enable,
    navigation: () =>
      navigateTo(
        modules.account_wishlist.enable,
        modules.account_wishlist.name,
      ),
  },
  {
    label: 'My Return',
    icon: 'corner-up-left',
    show: modules.account_myreturn.enable,
    navigation: () =>
      navigateTo(
        modules.account_myreturn.enable,
        modules.account_myreturn.name,
      ),
  },
  {
    label: 'Notifications',
    icon: 'bell',
    show: modules.account_notification.enable,
    navigation: () =>
      navigateTo(
        modules.account_notification.enable,
        modules.account_notification.name,
      ),
  },
  {
    label: 'Confirm Payment',
    icon: 'shopping-bag',
    show: modules.account_confirm_payment.enable,
    navigation: () =>
      navigateTo(
        modules.account_confirm_payment.enable,
        modules.account_confirm_payment.name,
      ),
  },
  {
    label: 'Languages',
    icon: 'globe',
    show: modules.account_languages.enable,
    navigation: () =>
      navigateTo(
        modules.account_languages.enable,
        modules.account_languages.name,
      ),
  },
  {
    label: 'About Us',
    icon: 'info',
    show: modules.account_about_us.enable,
    navigation: () =>
      navigateTo(
        modules.account_about_us.enable,
        modules.account_about_us.name,
      ),
  },
  {
    label: 'Contact Us',
    icon: 'phone',
    show: modules.account_contact_us.enable,
    navigation: () =>
      navigateTo(
        modules.account_contact_us.enable,
        modules.account_contact_us.name,
      ),
  },
  {
    label: 'Returns',
    icon: 'refresh-ccw',
    show: modules.account_returns.enable,
    navigation: () =>
      navigateTo(modules.account_returns.enable, modules.account_returns.name),
  },
  {
    label: 'Help',
    icon: 'help-circle',
    show: modules.account_help.enable,
    navigation: () =>
      navigateTo(modules.account_help.enable, modules.account_help.name),
  },
  {
    label: 'Settings',
    icon: 'settings',
    show: modules.account_settings.enable,
    navigation: () =>
      navigateTo(
        modules.account_settings.enable,
        modules.account_settings.name,
      ),
  },
];
