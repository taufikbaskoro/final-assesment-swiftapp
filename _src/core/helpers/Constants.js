/**
 * ---------------------------------------------------- *
 * @constant {user}
 * @summary this constants condition for user
 * ---------------------------------------------------- *
 */
export const USER_GUEST = 'guest';
export const USER_CUSTOMER = 'customer';

/**
 * ---------------------------------------------------- *
 * @constant {size}
 * @summary this constants use for styling
 * ---------------------------------------------------- *
 */
export const SMALL = {label: 'Small', size: 0.8};
export const MEDIUM = {label: 'Medium', size: 1};
export const LARGE = {label: 'Large', size: 1.35};

/**
 * ---------------------------------------------------- *
 * @constant {key item}
 * @summary this constants use for key on items
 * ---------------------------------------------------- *
 */
export const TOTAL_PRICE_BLOCK = 'total-price-block-';

/**
 * ---------------------------------------------------- *
 * @summary use for Form Field types
 * ---------------------------------------------------- *
 */
export const FORM_FIELD = {
  CHECKBOX: 'Checkbox',
  INPUT: 'Input',
  INPUT_DROPDOWN: 'InputDropDown',
  CUSTOM: 'Custom',
};

/**
 * ----------------------------------------- *
 * @constant {crashlytics}
 * @summary this constants use for
 * crashlytics attributes
 * ----------------------------------------- *
 */
export const CART_ID = 'CART ID';
export const USER_TYPE = 'USER TYPE';
export const BEARER = 'BEARER';
export const EMAIL = 'EMAIL';
export const COUPONS = 'COUPONS';
export const REMOVE = 'REMOVE';
export const SHIPPING_ADDRESS_ID = 'SHIPPING ADDRESS ID';
export const SHIPPING_METHOD_CODE = 'SHIPPING ADDRESS CODE';
export const PAYMENT_METHOD = 'PAYMENT METHOD';

/**
 * ---------------------------------------------------- *
 * @const {typeProducts}
 * @summary this constant use for product type name
 * from graphql
 * ---------------------------------------------------- *
 */
export const TYPENAME_CONFIGURABLE = 'ConfigurableProduct';
export const TYPENAME_BUNDLE = 'BundleProduct';
export const TYPENAME_VIRTUAL = 'VirtualProduct';

/**
 * ---------------------------------------------------- *
 * @const {productStatus}
 * @summary this constant use for product status
 * in oms or backoffice
 * ---------------------------------------------------- *
 */
export const IN_STOCK = 'IN_STOCK';
export const PRODUCT_TAB_DETAIL = 'details';
export const PRODUCT_TAB_REVIEW = 'review';

/**
 * ---------------------------------------------------- *
 * @const {onClickHandlerPrice}
 * @summary this constant use for on click handler key
 * on TotalPriceBlock
 * ---------------------------------------------------- *
 */
export const TOTAL_DISCOUNT = 'totalDiscount';

/**
 * ---------------------------------------------------- *
 * @const {storeURL}
 * @summary this constant use for version checking
 * in useFirestoreForceUpdate and Version helper
 * ---------------------------------------------------- *
 */
export const STOREURL_ANDROID = 'http://play.google.com/store/apps/details';
export const STOREID_ANDROID = 'com.getmystore.app';
export const STOREURL_IOS = 'itms-apps://itunes.apple.com/us/app/apple-store';
export const STOREID_IOS = '1527722475';
