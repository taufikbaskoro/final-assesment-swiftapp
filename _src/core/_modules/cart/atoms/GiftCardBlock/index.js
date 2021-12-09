import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {normalize} from '@app/styles/mixins';
import {withProfiler} from '@sentry/react-native';

import Button from '@app/components/Button';
import Input from '@app/components/Input';
import RenderIf from '@app/components/RenderIf';

import styles from '@app/_modules/cart/atoms/GiftCardBlock/styles';

const GiftCardBlock = ({appliedGiftCard, onButtonPress, giftCardLoading}) => {
  const editable = appliedGiftCard?.giftcard_detail[0]?.giftcard_amount_used
    ? false
    : true;
  const [code, setCode] = useState(
    appliedGiftCard?.giftcard_detail[0]?.giftcard_code || '',
  );

  return (
    <View style={styles.giftCardWrapper}>
      <View style={styles.giftCardTitle}>
        <Text style={styles.titleText}>Gift Card</Text>
        <Text style={styles.titleDescription}>
          Put your giftcard code if you already have it
        </Text>
      </View>
      <View style={styles.giftCardContent}>
        <View style={styles.giftCardBox}>
          <Input
            styleProp={styles.promoInput}
            textStyleProp={styles.promoInputText}
            value={code}
            editable={editable}
            onChangeText={text => setCode(text)}
            placeholder="Giftcard Here"
          />
          <RenderIf condition={editable}>
            <Button
              label="Apply"
              styleProp={{
                width: normalize(80),
              }}
              textStyleProp={{
                paddingVertical: normalize(3),
              }}
              onPress={() => onButtonPress(code, true)}
              loading={giftCardLoading}
            />
          </RenderIf>
          <RenderIf condition={!editable}>
            <Button
              label="Cancel"
              styleProp={{
                width: normalize(80),
              }}
              textStyleProp={{
                paddingVertical: normalize(3),
              }}
              onPress={() => {
                onButtonPress(code, false);
                setCode('');
              }}
              loading={giftCardLoading}
            />
          </RenderIf>
        </View>
      </View>
    </View>
  );
};

export default React.memo(withProfiler(GiftCardBlock, {name: 'GiftCardBlock'}));
