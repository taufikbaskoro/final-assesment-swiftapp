import React, {useEffect, useState} from 'react';

import {useMutation} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {MUTATION_CONFIRM_PAYMENT} from '@app/_modules/account_confirm_payment/services/schema';
import {rxAppSnackbar} from '@app/services/cache';

import DateHelper from '@app/helpers/Date';
import Views from '@app/_modules/account_confirm_payment/_view';
import {modules} from '@root/swift.config';

const Controller = ({navigation}) => {
  if (!modules.account_confirm_payment.enable) {
    return null;
  }

  const [postConfirmPayment, {data, error, loading}] = useMutation(
    MUTATION_CONFIRM_PAYMENT,
  );

  useEffect(() => {
    if (error !== undefined) {
      rxAppSnackbar({
        message: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data !== undefined) {
      let createConfirmPayment = data.createConfirmPayment;
      let success = createConfirmPayment.success;
      if (success) {
        rxAppSnackbar({
          message:
            'successfully post confirm payment, waiting for our information. Thank you.',
        });
        navigation.goBack();
      }
    }
  }, [data]);

  const [form, setForm] = useState({
    order_number: '',
    account_name: '',
    account_number: '',
    amount: 0, // bill
    date: DateHelper.convert(new Date(), '/', {reverse: true}), // date pay
    filename: '',
    image_base64: '',
    payment: '', // bca, mandiri
  });

  const onSetForm = value => {
    setForm({...form, ...value});
  };

  const postData = () => {
    if (form.order_number === '') {
      rxAppSnackbar({
        message: 'please fill order number',
      });
    } else if (form.account_name === '') {
      rxAppSnackbar({
        message: 'please fill account name',
      });
    } else if (form.account_number === '') {
      rxAppSnackbar({
        message: 'please fill account number',
      });
    } else if (form.amount === '') {
      rxAppSnackbar({
        message: 'please fill amount transferred',
      });
    } else if (form.date === '') {
      rxAppSnackbar({
        message: 'please fill date transferred',
      });
    } else {
      let variables = {input: form};
      postConfirmPayment({variables});
    }
  };

  return (
    <Views
      form={form}
      error={error}
      loading={loading}
      data={data}
      postData={postData}
      onSetForm={onSetForm}
    />
  );
};

export default withProfiler(Controller, {name: 'ConfirmPaymentController'});
