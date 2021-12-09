import {InMemoryCache, makeVar} from '@apollo/client';

/**
 * Set initial values when we create cache variables.
 */

export const rxAppLoading = makeVar(false);
export const rxAppSnackbar = makeVar(null);
export const rxUserInformation = makeVar(null);
export const rxUserToken = makeVar(null);
export const rxUserType = makeVar(null);
export const rxUserFontSize = makeVar(1);
export const rxUserWIshlistItems = makeVar(null);
export const rxUserAddresses = makeVar(null);
export const rxUserStoreCredit = makeVar(null);

export const rxCartPayment = makeVar([]);
export const rxCartAppliedCoupon = makeVar(null);
export const rxCartGiftCard = makeVar(null);
export const rxCartAppliedStoreCredit = makeVar(null);
export const rxCartAvailablePaymentMethod = makeVar(null);
export const rxCartBillingAddress = makeVar(null);
export const rxCartItems = makeVar(null);
export const rxCartId = makeVar(null);
export const rxCartIsVirtual = makeVar(false);
export const rxCartQty = makeVar(0);
export const rxCartPrices = makeVar(null);
export const rxCartExtraFee = makeVar(null);
export const rxCartPaymentMethod = makeVar(null);
export const rxCartPickupStore = makeVar(null);
export const rxCartShipping = makeVar([]);
export const rxCartShippingAmount = makeVar(null);
export const rxCartShippingAddress = makeVar(null);
export const rxCartShippingMethod = makeVar(null);

export const cache = new InMemoryCache({
  addTypename: true,
  typePolicies: {
    Query: {
      fields: {
        customer: {
          merge: false,
        },
        VesMenuChildren: {
          merge: false,
        },
        cart: {
          merge: false,
        },
      },
    },
  },
});
