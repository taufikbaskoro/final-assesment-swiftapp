import {compareSkus} from '@app/helpers/General';
import {rxCartIsVirtual} from '@app/services/cache';

export function parseCart(cartData) {
  const cartState = [];
  let cartIsVirtual = true;
  cartData?.map(item => {
    const {id, name, sku, thumbnail, url_key, price_range, __typename} =
      item.product;
    let nameTmp = name;
    let imageTmp = thumbnail.url;
    if (__typename === 'ConfigurableProduct') {
      const configurable_options = item.configurable_options;
      let color = '';
      let size = '';
      configurable_options.map(option => {
        if (option.option_label === 'Color') {
          color = option.value_label;
        }
        if (option.option_label === 'Size') {
          size = option.value_label;
        }
      });
      let skuTmp = [sku, size, color].join('-');
      const variants = item.product.variants;
      variants?.map(variant => {
        const {image, name: nameProduct, sku: skuProduct} = variant.product;
        if (compareSkus(skuTmp, skuProduct)) {
          nameTmp = nameProduct;
          imageTmp = image.url;
        }
      });
    }

    if (__typename !== 'VirtualProduct') {
      cartIsVirtual = false;
    }

    cartState.push({
      cartItemId: item.id,
      productId: id,
      sku,
      name: nameTmp,
      image: imageTmp,
      url_key: url_key,
      currency: price_range.maximum_price.final_price.currency,
      price: price_range.maximum_price.final_price.value,
      quantity: item.quantity,
      __typename: __typename,
    });
  });

  rxCartIsVirtual(cartIsVirtual);
  return cartState;
}
export function parseShippingAddress(shippingAddressData) {
  const {
    firstname,
    lastname,
    city,
    country,
    street,
    region,
    telephone,
    available_shipping_methods,
  } = shippingAddressData;
  return {
    firstname,
    lastname,
    city,
    country_id: country.code,
    street: street[0],
    region: region.label,
    telephone,
    available_shipping_methods,
    __typename: 'ShippingAddress',
  };
}
export function parseBillingAddress(billingAddressData) {
  const {firstname, lastname, city, country, street, region, telephone} =
    billingAddressData;
  return {
    firstname,
    lastname,
    city,
    country_id: country.code,
    street: street[0],
    region: region.label,
    telephone,
    __typename: 'BillingAddress',
  };
}

export function parseShippingMethod(shippingMethodData) {
  const {amount, carrier_code, carrier_title, method_code, method_title} =
    shippingMethodData;
  return {
    amount: amount.value,
    carrier_code,
    carrier_title,
    method_code,
    method_title,
    __typename: 'ShippingMethod',
  };
}
export function parsePaymentMethod(paymentMethodData) {
  const {title, code} = paymentMethodData;
  return {
    title,
    code,
    __typename: 'PaymentMethod',
  };
}
export function parsePrices(pricesData) {
  return {
    ...pricesData,
    __typename: 'Prices',
  };
}
export function parseExtraFee(extraFeeData) {
  return {
    ...extraFeeData,
    __typename: 'ExtraFee',
  };
}
export function parseAppliedCoupons(appliedCouponsData) {
  if (appliedCouponsData?.length > 0) {
    return {
      ...appliedCouponsData[0],
      __typename: 'AppliedCoupons',
    };
  }
  return null;
}
export function parseAppliedStoreCredit(appliedStoreCreditData) {
  return {
    ...appliedStoreCreditData,
    __typename: 'AppliedStoreCredit',
  };
}
