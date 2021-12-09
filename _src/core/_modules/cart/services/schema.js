import gql from 'graphql-tag';
import {filterGraphql} from '@app/services/helper';

const cartItems = `
items {
  id
  quantity
  ... on ConfigurableCartItem {
    configurable_options {
      option_label
      value_label
    }
  }
  product {
    ...ConfigurableProductCart
    id
    name
    sku
    special_price
    special_from_date
    special_to_date
    attribute_set_id
    small_image {
      url
      label
    }
    thumbnail {
      url
      label
    }
    new_from_date
    new_to_date
    options_container
    created_at
    updated_at
    country_of_manufacture
    price_range {
      maximum_price {
        regular_price {
          value
          currency
        }
        final_price {
          value
          currency
        }
        discount {
          amount_off
          percent_off
        }
      }
    }
    price_tiers {
      quantity
      final_price {
        value
        currency
      }
      discount {
        amount_off
        percent_off
      }
    }
    stock_status
    url_key
  }
  quantity
}
`;

const shippingAddress = `
shipping_addresses {
  firstname
  lastname
  street
  city
  telephone
  region {
    code
    label
  }
  country {
    code
    label
  }
  available_shipping_methods {
    amount {
      currency
      value
    }
    available
    carrier_code
    carrier_title
    error_message
    method_code
    method_title
    shipping_promo_name
    price_excl_tax {
      value
      currency
    }
    price_incl_tax {
      value
      currency
    }
  }
  selected_shipping_method {
    amount {
      value
      currency
    }
    carrier_code
    carrier_title
    method_code
    method_title
  }
}
`;

const billingAddress = `
billing_address {
  city
  company
  country {
    code
    label
  }
  firstname
  lastname
  postcode
  region {
    code
    label
  }
  street
  telephone
}
`;

const priceses = `
prices {
  discounts {
    amount {
      value
      currency
    }
    label
  }
  subtotal_excluding_tax {
    value
    currency
  }
  subtotal_including_tax {
    value
    currency
  }
  subtotal_with_discount_excluding_tax {
    value
    currency
  }
  applied_taxes {
    label
    amount {
      currency
      value
    }
  }
  grand_total {
    value
    currency
  }
}
`;

const ProductFragment = {
  configurable: gql`
    fragment ConfigurableProductCart on ConfigurableProduct {
      variants {
        product {
          name
          id
          sku
          image {
            url
            label
          }
        }
      }
    }
  `,
};

export const ADD_SIMPLE_PRODUCT = gql`
  ${ProductFragment.configurable}
  mutation addSimpleProductsToCart($input: AddSimpleProductsToCartInput) {
    addSimpleProductsToCart(input: $input) {
      cart {
        is_virtual
        ${cartItems}
        ${priceses}
      }
    }
  }
`;

export const ADD_VIRTUAL_PRODUCT = gql`
  ${ProductFragment.configurable}
  mutation addVirtualProductsToCart($input: AddVirtualProductsToCartInput) {
    addVirtualProductsToCart(input: $input) {
      cart {
        is_virtual
        ${cartItems}
        ${priceses}
      }
    }
  }
`;

export const ADD_CONFIGURABLE_PRODUCT = gql`
  ${ProductFragment.configurable}
  mutation addItemConfigurableCart($input: AddConfigurableProductsToCartInput) {
    addConfigurableProductsToCart(input: $input) {
      cart {
        id
        is_virtual
        ${cartItems}
        ${priceses}
      }
    }
  }
`;

export const ADD_BUNDLE_PRODUCT = gql`
  ${ProductFragment.configurable}
  mutation addBundleProductsToCart($input: AddBundleProductsToCartInput) {
    addBundleProductsToCart(input: $input) {
      cart {
        id
        is_virtual
        ${cartItems}
        ${priceses}
      }
    }
  }
`;

export const UPDATE_CART_ITEMS = gql`
  ${ProductFragment.configurable}
  mutation updateCartItems($input: UpdateCartItemsInput) {
    updateCartItems(input: $input) {
      cart {
        is_virtual
        ${cartItems}
        ${priceses}
      }
    }
  }
`;

export const REMOVE_ITEM = gql`
  ${ProductFragment.configurable}
  mutation removeItemFromCart($input: RemoveItemFromCartInput) {
    removeItemFromCart(input: $input) {
      cart {
        is_virtual
        ${cartItems}
        ${priceses}
      }
    }
  }
`;

export const GET_CART = gql`
  ${ProductFragment.configurable}
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      email
      total_quantity
      is_virtual
      applied_coupons {
        code
      }
      applied_store_credit {
        is_use_store_credit
        store_credit_amount
      }
      applied_giftcard {
        giftcard_amount
        giftcard_detail {
          giftcard_amount_used
          giftcard_code
        }
      }
      billing_address {
        firstname
        lastname
        city
        street
        postcode
        telephone
        country {
          code
          label
        }
        region {
          code
          label
        }
      }
      ${shippingAddress}
      items {
        id
        quantity
        ... on ConfigurableCartItem {
          configurable_options {
            option_label
            value_label
          }
        }
        product {
          ...ConfigurableProductCart
          id
          name
          sku
          special_price
          special_from_date
          special_to_date
          attribute_set_id
          small_image {
            url
            label
          }
          thumbnail {
            url
            label
          }
          new_from_date
          new_to_date
          options_container
          created_at
          updated_at
          country_of_manufacture
          price_range {
            maximum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
              discount {
                amount_off
                percent_off
              }
            }
          }
          price_tiers {
            quantity
            final_price {
              value
              currency
            }
            discount {
              amount_off
              percent_off
            }
          }
          stock_status
          url_key
        }
        quantity
      }
      available_payment_methods {
        code
        title
      }
      selected_payment_method {
        code
        title
      }
      addtional_fees {
        data {
          enabled
          fee_name
          frontend_type
          id_fee
          options {
            default
            label
            option_id
            price
          }
        }
        show_on_cart
      }
      applied_extra_fee {
        extrafee_value {
          currency
          value
        }
        select_options {
          default
          label
          option_id
          price
        }
        show_on_cart
        title
      }
      ${priceses}
    }
  }
`;

export const GET_CART_PRICES = gql`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      applied_coupons {
        code
      }
      applied_store_credit {
        is_use_store_credit
        store_credit_amount
      }
      applied_giftcard {
        giftcard_amount
        giftcard_detail {
          giftcard_amount_used
          giftcard_code
        }
      }
      applied_extra_fee {
        extrafee_value {
          currency
          value
        }
        select_options {
          default
          label
          option_id
          price
        }
        show_on_cart
        title
      }
      shipping_addresses {
        selected_shipping_method {
          amount {
            value
            currency
          }
        }
      }
      ${priceses}
    }
  }
`;

export const SET_GUEST_EMAIL = gql`
  mutation setGuestEmail($input: SetGuestEmailOnCartInput) {
    setGuestEmailOnCart(input: $input) {
      cart {
        id
        email
      }
    }
  }
`;

export const GET_SHIPPING = gql`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      billing_address {
        city
        company
        country {
          code
          label
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
      }
      ${shippingAddress}
      ${priceses}
    }
  }
`;

export const SET_SHIPPING_METHOD = gql`
  mutation setShippingMethod($input: SetShippingMethodsOnCartInput) {
    setShippingMethodsOnCart(input: $input) {
      cart {
        id
        ${shippingAddress}
        ${priceses}
      }
    }
  }
`;

export const SET_SHIPPING_ADDRESS = gql`
  mutation setShippingAddress($input: SetShippingAddressesOnCartInput) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        id
        ${billingAddress}
        ${shippingAddress}
        ${priceses}
      }
    }
  }
`;

export const SET_BILLING_ADDRESS = gql`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput) {
    setBillingAddressOnCart(input: $input) {
      cart {
        id
        ${billingAddress}
        ${shippingAddress}
        ${priceses}
      }
    }
  }
`;

export const SET_PAYMENT_METHOD = gql`
  mutation setPaymentMethod($input: SetPaymentMethodOnCartInput) {
    setPaymentMethodOnCart(input: $input) {
      cart {
        id
        email
        selected_payment_method {
          code
          title
        }
      }
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation placeOrder($input: PlaceOrderInput) {
    placeOrder(input: $input) {
      order {
        order_number
      }
    }
  }
`;

export const GET_SNAP_TOKEN = gql(
  filterGraphql(`
  query getSnapTokenByOrderId($orderId: String!) {
    getSnapTokenByOrderId(order_id: $orderId) {
      snap_token
      redirect_url
    }
  }
`),
);

export const GET_SNAP_STATUS = gql(
  filterGraphql(`
  query getSnapOrderStatus($orderId: String!) {
    getSnapOrderStatusByOrderId(order_id: $orderId) {
      order_id
      success
      status_message
      cart_id
    }
  }
`),
);

export const UPDATE_EXTRA_FEE = gql`
  mutation updateExtraFeeOnCart($input: updateExtraFeeOnCartInput) {
    updateExtraFeeOnCart(input: $input) {
      cart {
        applied_extra_fee {
          extrafee_value {
            currency
            value
          }
          select_options {
            default
            label
            option_id
            price
          }
          show_on_cart
          title
        }
        ${priceses}
      }
    }
  }
`;

export const APPLIED_COUPONS = gql`
  mutation applyCouponToCart($input: ApplyCouponToCartInput) {
    applyCouponToCart(input: $input) {
      cart {
        applied_coupons {
          code
        }
        ${priceses}
      }
    }
  }
`;

export const REMOVED_COUPONS = gql`
  mutation removeCouponFromCart($input: RemoveCouponFromCartInput) {
    removeCouponFromCart(input: $input) {
      cart {
        applied_coupons {
          code
        }
        ${priceses}
      }
    }
  }
`;

export const APPLY_GIFT_CARD = gql`
  mutation applyGiftCardToCart($input: ApplyGiftCardToCartInput) {
    applyGiftCardToCart(input: $input) {
      cart {
        applied_giftcard {
          giftcard_amount
          giftcard_detail {
            giftcard_amount_used
            giftcard_code
          }
        }
        ${priceses}
      }
    }
  }
`;

export const REMOVE_GIFT_CARD = gql`
  mutation removeGiftCardFromCart($input: RemoveGiftCardFromCartInput) {
    removeGiftCardFromCart(input: $input) {
      cart {
        applied_giftcard {
          giftcard_amount
          giftcard_detail {
            giftcard_amount_used
            giftcard_code
          }
        }
        ${priceses}
      }
    }
  }
`;

export const APPLIED_STORE_CREDIT = gql`
  mutation applyStoreCreditToCart($input: ApplyStoreCreditToCartInput) {
    applyStoreCreditToCart(input: $input) {
      cart {
        applied_store_credit {
          store_credit_amount
          is_use_store_credit
        }
        ${priceses}
      }
    }
  }
`;

export const REMOVED_STORE_CREDIT = gql`
  mutation removeStoreCreditFromCart($input: RemoveStoreCreditFromCartInput) {
    removeStoreCreditFromCart(input: $input) {
      cart {
        applied_store_credit {
          store_credit_amount
          is_use_store_credit
        }
        ${priceses}
      }
    }
  }
`;

export const GET_CUSTOMER_REWARD_POINTS = gql`
  query getCustomerRewardPoints {
    customerRewardPoints {
      balance
      balanceCurrency
    }
  }
`;

export const GET_APPLIED_REWARD_POINTS = gql`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      applied_reward_points {
        is_use_reward_points
        reward_points
        reward_points_amount
        __typename
      }
    }
  }
`;

export const APPLY_REWARD_POINTS = gql`
  mutation applyRewardPointsToCart($input: ApplyRewardPointsToCartInput) {
    applyRewardPointsToCart(input: $input) {
      cart {
        applied_reward_points {
          is_use_reward_points
          reward_points
          reward_points_amount
          __typename
        }
        ${priceses}
      }
    }
  }
`;

export const REMOVED_REWARD_POINTS = gql`
  mutation removeRewardPointsFromCart($input: RemoveRewardPointsFromCartInput) {
    removeRewardPointsFromCart(input: $input) {
      cart {
        applied_reward_points {
          is_use_reward_points
          reward_points
          reward_points_amount
          __typename
        }
        ${priceses}
      }
    }
  }
`;
