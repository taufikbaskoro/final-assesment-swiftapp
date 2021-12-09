import {rxAppLoading} from '@app/services/cache';

/**
 * ---------------------------------------------------- *
 * @const {loadingStart}
 * @summary reactive for app loader start
 * ---------------------------------------------------- *
 */
export const loadingStart = () => {
  rxAppLoading(true);
};

/**
 * ---------------------------------------------------- *
 * @const {loadingStop}
 * @summary reactive for app load stop
 * ---------------------------------------------------- *
 */
export const loadingStop = () => {
  rxAppLoading(false);
};

/**
 * ---------------------------------------------------- *
 * @const {compareSkus}
 * @summary compare between two sku
 * ---------------------------------------------------- *
 */
export const compareSkus = (sku1, sku2) => {
  const arraySku1 = sku1.split('-').sort();
  const arraySku2 = sku2.split('-').sort();

  for (var i = 0; i < arraySku1.length; ++i) {
    if (arraySku1[i] !== arraySku2[i]) {
      return false;
    }
  }
  return true;
};

/**
 * ---------------------------------------------------- *
 * @const {Capitalize}
 * @summary for capital only first letter
 * ---------------------------------------------------- *
 */
export const Capitalize = str => {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1) || '';
};

/**
 * ---------------------------------------------------- *
 * @const {formatDateNotif}
 * @summary for date format notification
 * ---------------------------------------------------- *
 */
export const formatDateNotif = date => {
  const x = date.split('-');
  const d = x[2].split(' ');
  const formatted_date = d[0] + '/' + x[1] + '/' + x[0];
  return formatted_date;
};

/**
 * ---------------------------------------------------- *
 * @const {formatDateOrder}
 * @summary for date format order
 * ---------------------------------------------------- *
 */
export const formatDateOrder = date => {
  const d = date.split(' ');
  return d[0];
};

/**
 * ---------------------------------------------------- *
 * @const {formatDateTime}
 * @summary for date format with time
 * ---------------------------------------------------- *
 */
export const formatDateTime = date => {
  if (date) {
    let d = date.split('T');
    d = d[0] + ' ' + d[1].split('+')[0];
    return d.split('Z')[0];
  } else {
    return date;
  }
};

/**
 * ---------------------------------------------------- *
 * @const {toFixedFix}
 * @summary for fix number behind comma
 * ---------------------------------------------------- *
 */
export const toFixedFix = (n, prec) => {
  var k = Math.pow(10, prec);
  return '' + Math.round(n * k) / k;
};

/**
 * ---------------------------------------------------- *
 * @const {numberFormat}
 * @summary for number format with currency
 * ---------------------------------------------------- *
 */
export const numberFormat = (
  prefix = null,
  number,
  thousandSeparator,
  decimals,
  decPoint,
) => {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  let n = !isFinite(+number) ? 0 : +number;
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  let sep = typeof thousandSeparator === 'undefined' ? ',' : thousandSeparator;
  let dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  let s = '';

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }

  const newPrefix = prefix == null ? '.' : prefix;
  return newPrefix + s.join(dec);
};

/**
 * ---------------------------------------------------- *
 * @const {convertAndRound}
 * @summary for covert number to percentage
 * ---------------------------------------------------- *
 */
export const convertAndRound = number => {
  const num = parseFloat(number);
  return Math.round(num) + '%';
};

/**
 * ---------------------------------------------------- *
 * @const {shortenText}
 * @summary for excerpt sentences
 * ---------------------------------------------------- *
 */
export const shortenText = (text, limit = 40) => {
  if (text.length > limit) {
    return text.substring(0, limit - 1) + '...';
  } else {
    return text;
  }
};

/**
 * ---------------------------------------------------- *
 * @const {trimHTMLTags}
 * @summary for remove space in html content
 * ---------------------------------------------------- *
 */
export const trimHTMLTags = text => {
  const regex = /(<([^>]+)>)/gi;
  let trimmedTags = text.replace(regex, '');

  let result = trimmedTags.replace('&nbsp;', '');

  return result;
};
