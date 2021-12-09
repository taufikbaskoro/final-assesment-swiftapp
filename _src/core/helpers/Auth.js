import {Storage} from '@app/helpers/Storage';
import {
  rxCartId,
  rxCartItems,
  rxUserAddresses,
  rxAppSnackbar,
  rxUserToken,
  rxUserType,
  rxUserWIshlistItems,
} from '@app/services/cache';

export const signOut = () => {
  rxUserType(null);
  rxUserToken(null);
  rxCartItems(null);
  rxCartId(null);
  rxUserWIshlistItems(null);
  rxUserAddresses(null);
  Storage.clear();
};

export const handleError = (error, resetCart) => {
  const {message} = error;
  // if (message.includes(`JSON Parse error: Unrecognized token`)) {
  //   navigate(routes.MAINTENANCE.name);
  // }
  if (
    message.includes('Current user does not have an active cart') ||
    message.includes('The current user cannot perform operations on cart')
  ) {
    resetCart();
  }

  if (
    // message.includes(`The current user cannot perform operations on cart`) ||
    message.includes("The current customer isn't authorized.")
  ) {
    rxAppSnackbar({
      message: 'Your session has expired, please login again.',
    });
    signOut();
  }
};
