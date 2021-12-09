const dataMonthsID = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const dataMonthsEN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default {
  convert: (date, seperate = '-', opts = {}) => {
    let dateFinal = new Date(date);
    let getMonth = dateFinal.getMonth();
    let dd = String(dateFinal.getDate()).padStart(2, '0');
    let mm = String(getMonth + 1).padStart(2, '0'); //January is 0!
    let yyyy = dateFinal.getFullYear();

    if (opts.useMonthString) {
      let locale = opts.locale === undefined ? 'id' : 'en';
      let monthString =
        locale === 'id' ? dataMonthsID[getMonth] : dataMonthsEN[getMonth];
      dateFinal = dd + seperate + monthString + seperate + yyyy;
    } else {
      if (opts.reverse) {
        dateFinal = yyyy + seperate + mm + seperate + dd;
      } else {
        dateFinal = dd + seperate + mm + seperate + yyyy;
      }
    }
    return dateFinal;
  },
  now: (withFormat = false) => {
    let today = new Date();
    if (withFormat) {
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
    }
    return today;
  },
  addMinutes(minutes, withFormat) {
    let currentDate = new Date();
    let date = new Date(currentDate.getTime() + minutes * 60 * 1000);

    if (withFormat) {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = date.getFullYear();
      date = dd + '/' + mm + '/' + yyyy;
    }

    return date;
  },
  addDays: (days, withFormat) => {
    let date = new Date();
    let numberOfDaysToAdd = days;
    date.setDate(date.getDate() + numberOfDaysToAdd);

    if (withFormat) {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = date.getFullYear();
      date = dd + '/' + mm + '/' + yyyy;
    }

    return date;
  },
  compareDate: (dateOne, dateTwo) => {
    return dateOne > dateTwo;
  },
};
