import React, {useState} from 'react';
import {View} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {normalize} from '@app/styles/mixins';
import Button from '@app/components/Button';
import Input from '@app/components/Input';
import RenderIf from '@app/components/RenderIf';
import {Text} from 'react-native-paper';
import styles from '@app/_modules/cart/atoms/PromoCodeBlock/styles';

const PromoCodeBlock = ({
  dataAppliedCoupons,
  onButtonPress,
  couponsLoading,
}) => {
  const editable = dataAppliedCoupons?.code ? false : true;
  const [code, setCode] = useState(dataAppliedCoupons?.code || '');
  return (
    <View style={styles.promoWrapper}>
      <View style={styles.promoTitle}>
        <Text style={styles.titleText}>Promo Code</Text>
        <Text style={styles.titleDescription}>
          Put your promo code if you already have it
        </Text>
      </View>
      <View style={styles.promoContent}>
        <View style={styles.promoBox}>
          <Input
            styleProp={styles.promoInput}
            textStyleProp={styles.promoInputText}
            value={code}
            editable={editable}
            onChangeText={text => setCode(text)}
            placeholder="Promo Code Here"
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
              loading={couponsLoading}
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
              loading={couponsLoading}
            />
          </RenderIf>
        </View>
      </View>
    </View>
  );
};

export default React.memo(
  withProfiler(PromoCodeBlock, {name: 'PromoCodeBlock'}),
);
