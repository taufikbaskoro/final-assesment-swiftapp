import React from 'react';
import {SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';
import {withProfiler} from '@sentry/react-native';
import {normalize} from '@app/styles/mixins';

import DateHelper from '@app/helpers/Date';
import Input from '@app/components/Input';
import Appbar from '@app/components/AppBar';
import Button from '@app/components/Button';
import DatePicker from '@app/components/DatePicker';
import ImagePicker from '@app/components/ImagePicker';

import styles from '@app/_modules/account_confirm_payment/styles';

function Views({navigation, loading, form, onSetForm, postData}) {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Appbar useBack title="Confirm Payment" />
      <KeyboardAwareScrollView
        behavior={'padding'}
        style={styles.frame}
        contentContainerStyle={{alignItems: 'center'}}>
        <Input
          label={t('label.orderNumber')}
          placeholder={t('textPlaceholder.orderNumber')}
          value={form.order_number}
          onChangeText={text => {
            onSetForm({order_number: text});
          }}
        />
        <Input
          label={t('label.bankName')}
          placeholder={t('textPlaceholder.bankName')}
          value={form.payment}
          onChangeText={text => {
            onSetForm({payment: text});
          }}
        />
        <Input
          label={t('label.bankAccountNumber')}
          placeholder={t('textPlaceholder.bankAccountNumber')}
          value={form.account_number}
          onChangeText={text => {
            onSetForm({account_number: text});
          }}
        />
        <Input
          label={t('label.bankAccountName')}
          placeholder={t('textPlaceholder.bankAccountName')}
          value={form.account_name}
          onChangeText={text => {
            onSetForm({account_name: text});
          }}
        />

        <Input
          label={t('label.amountTransfer')}
          placeholder={t('textPlaceholder.amount')}
          keyboardType={'numeric'}
          value={form.amount}
          onChangeText={text => {
            onSetForm({amount: text});
          }}
        />

        <DatePicker
          label={t('label.transferDate')}
          callback={date => {
            onSetForm({date: date.toString()});
          }}
        />

        <ImagePicker
          label={t('label.uploadImage')}
          callback={imageData => {
            let imageDate = DateHelper.convert(new Date());
            let image_base64 =
              'data:' + imageData.mime + ';base64,' + imageData.data;
            onSetForm({
              filename:
                'confirm-payment-' + imageDate + form.order_number + '.jpg',
              image_base64,
            });
          }}
        />

        <Button
          width={normalize(150)}
          label={t('label.confirmPayment')}
          loading={loading}
          onPress={postData}
          styleProp={styles.logoutButton}
          textStyleProp={styles.confirmButtonText}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
export default withProfiler(Views, {name: 'ConfirmPaymentView'});
