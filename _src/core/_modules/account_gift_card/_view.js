import Button from '@app/components/Button';
import Input from '@app/components/Input';

import Appbar from '@app/components/AppBar';

import RenderIf from '@app/components/RenderIf';
import Text from '@app/components/Text';
import {numberFormat} from '@app/helpers/General';

import React, {useState} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';

import styles from '@app/_modules/account_gift_card/styles';

function Views({onCheckStatusAndBalance, giftCardAccount, loading, isChecked}) {
  const [giftCardCode, setGiftCardCode] = useState('');

  // TODO : Styling & asked for code with expiration date
  const checkAvilability = expiration_date => {
    const ACTIVE = 'Active';
    const INACTIVE = 'Inactive';

    if (!expiration_date) {
      return ACTIVE;
    }

    let expDate = expiration_date.split(' ')[0].split('-');
    let newDate = new Date(expDate[2], expDate[1] - 1, expDate[0]);
    const expTimeStamp = newDate.getTime();

    if (Date.now() > expTimeStamp) {
      return INACTIVE;
    }

    return ACTIVE;
  };

  const GiftCardInformation = withProfiler(
    ({giftCardAccountResult}) => {
      return (
        <View style={styles.sectionContainer}>
          <View style={styles.fieldContainer}>
            <Text>Code :</Text>
            <Text>{giftCardAccountResult.code}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text>Availability :</Text>
            <Text>
              {checkAvilability(giftCardAccountResult.expiration_date)}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text>Balance :</Text>
            <Text>{numberFormat('IDR', giftCardAccountResult.balance)}</Text>
          </View>
        </View>
      );
    },
    {name: 'GiftCardInformation'},
  );

  return (
    <>
      <Appbar useBack title="Gift Card" />
      <View style={styles.mainContainer}>
        <RenderIf condition={giftCardAccount && !loading}>
          <GiftCardInformation giftCardAccount={giftCardAccount} />
        </RenderIf>
        <RenderIf condition={loading}>
          <View style={styles.sectionContainer}>
            <ActivityIndicator />
          </View>
        </RenderIf>
        <RenderIf condition={!loading && isChecked && !giftCardAccount}>
          <View style={[styles.sectionContainer, {alignItems: 'center'}]}>
            <Text>Gift Card Code not found</Text>
            <Text>Please try another code</Text>
          </View>
        </RenderIf>
        <Input
          label="Enter Gift Card code "
          value={giftCardCode}
          onChangeText={setGiftCardCode}
        />
        <Button
          label="Check Status and Balance"
          styleProp={styles.checkButton}
          onPress={() => onCheckStatusAndBalance(giftCardCode)}
        />
      </View>
    </>
  );
}

export default withProfiler(Views, {name: 'GiftCardView'});
