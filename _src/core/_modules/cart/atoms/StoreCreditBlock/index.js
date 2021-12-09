import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';

import Button from '@app/components/Button';
import Section from '@app/components/Section';
import RenderIf from '@app/components/RenderIf';
import styles from '@app/_modules/cart/atoms/StoreCreditBlock/styles';

const StoreCreditBlock = ({
  dataStoreCredit,
  onButtonPress,
  storeCreditLoading,
  dataAppliedStoreCredit,
}) => {
  const editable = dataAppliedStoreCredit?.is_use_store_credit;
  if (
    !dataStoreCredit?.enabled ||
    dataStoreCredit?.current_balance.value <= 0
  ) {
    return null;
  }
  return (
    <View style={styles.storeCreditWrapper}>
      <View style={styles.storeCreditTitle}>
        <Text style={styles.storeCreditTitleText}>Store Credit</Text>
      </View>
      <View style={styles.storeCreditContent}>
        <View style={styles.storeCreditBox}>
          <Section flex alignStart vmargin>
            <Text>{dataStoreCredit?.current_balance.value}</Text>
          </Section>
          <RenderIf condition={!editable}>
            <Button
              label="Apply"
              styleProp={{width: 80}}
              textStyleProp={{paddingVertical: 3}}
              onPress={() => onButtonPress(true)}
              loading={storeCreditLoading}
            />
          </RenderIf>
          <RenderIf condition={editable}>
            <Button
              label="Cancel"
              styleProp={{width: 80}}
              textStyleProp={{paddingVertical: 3}}
              onPress={() => onButtonPress(false)}
              loading={storeCreditLoading}
            />
          </RenderIf>
        </View>
      </View>
    </View>
  );
};

export default React.memo(
  withProfiler(StoreCreditBlock, {name: 'StoreCreditBlock'}),
);
