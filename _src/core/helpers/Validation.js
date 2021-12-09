/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
export const isEmpty = text => {
  return text === '' ? true : false;
};

export const isNumber = number => {
  var re = /^[0-9]*$/;
  return re.test(String(number));
};

export const invalidEmail = email => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
};

export const invalidZip = number => {
  var re = /^[0-9]{5}$/;
  return !re.test(String(number));
};

export const invalidOtp = number => {
  var re = /^[0-9]{4}$/;
  return !re.test(String(number));
};

export const invalidPhone = number => {
  var re = /^0.[0-9]{8,13}$/;
  return !re.test(String(number));
};

export const invalidPassword = password => {
  var re = /^.{8,}$/;
  return !re.test(String(password));
};

// export const invalidPassword = (password) => {
//     var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return !re.test(String(password));
// }
