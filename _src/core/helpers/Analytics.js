import analytics from '@react-native-firebase/analytics';

const EVENT_NAME = {
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  ADD_TO_WISHLIST: 'add_to_wishlist',
  REMOVE_TO_WISHLIST: 'remove_to_wishlist',
  VIEW_ITEM: 'view_item',
  VIEW_CART: 'view_cart',
  COUPON: 'coupon',
  STORE_CREDIT: 'store_credit',
};

const defaultCurrency = 'IDR';

export default {
  /**
   * ----------------------------------------- *
   * @summary custom analytics
   * ----------------------------------------- *
   */
  eventAddItemCart: ({item, quantity}) => {
    let currency = item.currency;
    let price = item.price;
    let priceTotal = price * quantity;

    analytics().logEvent(EVENT_NAME.ADD_TO_CART, {
      currency: currency,
      value: priceTotal,
      item_id: item.id,
      item_name: item.name,
      item_sku: item.sku,
    });
  },
  eventRemoveItemCart: ({item}) => {
    analytics().logEvent(EVENT_NAME.REMOVE_FROM_CART, {
      currency: item.currency,
      value: item.price,
      item_id: item.id,
      item_name: item.name,
      item_sku: item.sku,
    });
  },
  eventAddItemWishlist: ({item}) => {
    analytics().logEvent(EVENT_NAME.ADD_TO_WISHLIST, {
      currency: item.currency,
      value: item.value,
      item_name: item.item_name,
      item_sku: item.item_sku,
    });
  },
  eventRemoveItemWishlist: ({item}) => {
    analytics().logEvent(EVENT_NAME.REMOVE_TO_WISHLIST, {
      currency: item.currency,
      value: item.value,
      item_name: item.item_name,
      item_sku: item.item_sku,
    });
  },
  eventViewCart: () => {
    analytics().logEvent(EVENT_NAME.VIEW_CART, {
      currency: defaultCurrency,
      value: 10000,
      cart_id: '12345',
      type: '', //guest or customer
      email: '',
    });
  },
  eventViewItem: ({item}) => {
    let currency = item.price.currency;
    let price = item.price.finalAmount;

    analytics().logEvent(EVENT_NAME.REMOVE_FROM_CART, {
      currency: currency,
      value: price,
      item_id: item.id,
      item_name: item.name,
      item_sku: item.sku,
    });
  },
  eventUseCuopon: paramCoupons => {
    analytics().logEvent(EVENT_NAME.COUPON, paramCoupons);
  },
  eventUseStoreCredit: storeCredit => {
    console.log(storeCredit);
    // analytics().logEvent(EVENT_NAME.STORE_CREDIT, {
    //   currency: defaultCurrency,
    //   value: 10000,
    //   cart_id: '12345',
    //   type: '', //guest or customer
    //   email: '',
    // });
  },

  /**
   * ----------------------------------------- *
   * @summary default analytics
   * ----------------------------------------- *
   */
  eventViewItemList: paramItemList => {
    analytics().logViewItemList(paramItemList);
  },
  eventAddPaymentInfo: ({payment_type}) => {
    analytics().logAddPaymentInfo({payment_type});
  },
  eventAddShippingInfo: ({shipping_tier}) => {
    analytics().logAddShippingInfo({shipping_tier});
  },
  eventLogPurchase: ({transaction_id, currency, value}) => {
    analytics().logPurchase({
      transaction_id,
      currency,
      value,
    });
  },
  eventSearch: searchText => {
    if (searchText) {
      analytics().logSearch({search_term: searchText});
    }
  },
};
