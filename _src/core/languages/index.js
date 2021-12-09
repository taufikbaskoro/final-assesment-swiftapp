import en from '@app/languages/en';
import enAuthLanding from '@app/_modules/auth_landing/locales/en';
import enProductDetail from '@app/_modules/product_detail/locales/en';
import enCartAddToCartBlock from '@app/_modules/cart/atoms/AddToCart/locales/en';
import enCartTotalPriceBlock from '@app/_modules/cart/atoms/TotalPriceBlock/locales/en';

import id from '@app/languages/id';
import idAuthLanding from '@app/_modules/auth_landing/locales/id';
import idProductDetail from '@app/_modules/product_detail/locales/id';
import idCartAddToCartBlock from '@app/_modules/cart/atoms/AddToCart/locales/id';
import idCartTotalPriceBlock from '@app/_modules/cart/atoms/TotalPriceBlock/locales/id';

/**
 * ---------------------------------------------------- *
 * @const {resources}
 * @summary all resources init
 * ---------------------------------------------------- *
 */
export default {
  en: {
    translation: {
      ...en,
      auth_landing: enAuthLanding,
      product_detail: enProductDetail,
      cart: {
        total_price_block: enCartTotalPriceBlock,
        add_to_cart: enCartAddToCartBlock,
      },
    },
  },
  id: {
    translation: {
      ...id,
      auth_landing: idAuthLanding,
      product_detail: idProductDetail,
      cart: {
        total_price_block: idCartTotalPriceBlock,
        add_to_cart: idCartAddToCartBlock,
      },
    },
  },
};
