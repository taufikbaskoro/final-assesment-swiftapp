/**
 * ----------------------------------------- *
 * @constant {languages}
 * @summary data language support
 * ----------------------------------------- *
 */
export const languages = ['en', 'id'];

/**
 * ----------------------------------------- *
 * @constant {socialShares}
 * @summary social shares enable in PDP
 * ----------------------------------------- *
 */
export const socialShares = ['email', 'instagram', 'whatsapp'];

/**
 * ----------------------------------------- *
 * @constant {apolloConfig}
 * @summary apollo for config
 * @file @app/services/api.js
 * ----------------------------------------- *
 */
export const apolloConfig = {
  method: 'GET',
  console: false,
};

/**
 * ----------------------------------------- *
 * @constant {tabsApp}
 * @summary name of tabs apps in main page after login
 * @file @app/navigations/_stack-app.js
 * ----------------------------------------- *
 */
export const tabsApp = {
  enable: true,
  name: 'TabStackApp',
};

/**
 * ----------------------------------------- *
 * @constant {modules}
 * @summary this all modules config
 * @file @app/_modules/*
 * ----------------------------------------- *
 */
export const modules = {
  account: {
    name: 'Account',
    enable: true,
  },
  account_about_us: {
    name: 'AboutUs',
    enable: false,
  },
  account_change_password: {
    name: 'AccountChangePassword',
    enable: true,
  },
  account_confirm_payment: {
    name: 'AccountConfirmPayment',
    enable: true,
  },
  account_contact_us: {
    name: 'AccountContactUs',
    enable: true,
  },
  account_gift_card: {
    name: 'AccountGiftCard',
    enable: true,
  },
  account_help: {
    name: 'AccountHelp',
    enable: true,
  },
  account_languages: {
    name: 'AccountLanguages',
    enable: true,
  },
  account_myaccount: {
    name: 'AccountMyAccount',
    enable: true,
  },
  account_update_information: {
    name: 'AccountUpdateInformation',
    enable: true,
  },
  account_address_add: {
    name: 'AddAddress',
    enable: true,
  },
  account_address_edit: {
    name: 'EditAddress',
    enable: true,
    desc: 'now its component must conversion into modules (address_form)',
  },
  account_myreturn: {
    name: 'AccountMyReturn',
    enable: true,
  },
  account_storecredit: {
    name: 'AccountStoreCredit',
    enable: true,
  },
  account_myreturn_detail: {
    name: 'AccountMyReturnDetail',
    enable: true,
  },
  account_notification: {
    name: 'AccountNotification',
    enable: true,
  },
  account_notification_detail: {
    name: 'AccountNotificationDetail',
    enable: true,
  },
  account_purchases: {
    name: 'AccountPurchases',
    enable: true,
  },
  account_purchases_detail: {
    name: 'AccountPurchasesDetail',
    enable: true,
  },
  account_returns: {
    name: 'AccountReturns',
    enable: true,
  },
  account_rewardpoint: {
    name: 'AccountRewardPoint',
    enable: true,
  },
  account_settings: {
    name: 'AccountSettings',
    enable: false,
  },
  account_trackorder: {
    name: 'AccountTrackOrder',
    enable: true,
  },
  account_wishlist: {
    name: 'AccountWishlist',
    enable: true,
  },
  auth_landing: {
    name: 'AuthLanding',
    enable: true,
  },
  auth_signin: {
    name: 'AuthSignin',
    enable: true,
  },
  auth_signup: {
    name: 'AuthSignup',
    enable: true,
    atoms: {
      otp: {
        name: 'AtomOtp',
        component: false,
        enable: false,
      },
    },
  },
  account_storecredit: {
    name: 'AccountStoreCredit',
    enable: false,
  },
  blog_detail: {
    name: 'BlogDetail',
    enable: true,
  },
  blog_list: {
    name: 'BlogList',
    enable: true,
  },
  cart: {
    name: 'Cart',
    enable: true,
    atoms: {
      update_item_qty_modal: {
        name: 'QuantityModal',
        enable: false,
      },
      update_item_qty_input: {
        name: 'CustomInputQty',
        enable: true,
      },
    },
  },
  cart_onestepcheckout: {
    name: 'CartOneStepCheckout',
    enable: false,
  },
  cart_payment: {
    name: 'CartPayment',
    enable: true,
  },
  cart_shipping: {
    name: 'CartShipping',
    enable: true,
  },
  cart_thankyou: {
    name: 'CartThankYou',
    enable: true,
  },
  cart_guestcheckout: {
    name: 'GuestCheckout',
    enable: true,
  },
  customer_chat: {
    name: 'CustomerChat',
    enable: false,
  },
  main_categories: {
    name: 'MainCategories',
    enable: true,
  },
  main_home: {
    name: 'MainHome',
    enable: true,
  },
  main_search: {
    name: 'MainSearch',
    enable: true,
  },
  product_detail: {
    name: 'ProductDetail',
    enable: true,
    atoms: {
      social_share: {
        name: 'SocialShare',
        component: true,
        enable: false,
      },
    },
  },
  product_list: {
    name: 'ProductList',
    enable: true,
  },
  product_popular: {
    name: 'ProductPopular',
    enable: true,
  },
  taxes: {
    name: 'Taxes',
    enable: true,
  },
};
