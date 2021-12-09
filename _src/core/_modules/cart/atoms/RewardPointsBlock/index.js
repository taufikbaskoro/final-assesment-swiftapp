import React from 'react';
import {Text, View} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {normalize} from '@app/styles/mixins';
import styles from '@app/_modules/cart/atoms/RewardPointsBlock/styles';

import Button from '@app/components/Button';
import Section from '@app/components/Section';
import RenderIf from '@app/components/RenderIf';

const RewardPointsBlock = ({
  customerRewardPoints,
  onButtonPress,
  rewardPointsLoading,
  aplliedRewardPoints,
}) => {
  const editable = aplliedRewardPoints?.is_use_reward_points;
  if (!customerRewardPoints || customerRewardPoints?.balance <= 0) {
    return null;
  }
  return (
    <View style={styles.rewardPointsWrapper}>
      <View style={styles.rewardPointsTitle}>
        <Text style={styles.rewardPointsTitleText}>Reward Points</Text>
      </View>
      <View style={styles.rewardPointsContent}>
        <View style={styles.rewardPointsBox}>
          <Section flex alignStart vmargin>
            <Text>{customerRewardPoints?.balance}</Text>
          </Section>
          <RenderIf condition={!editable}>
            <Button
              label="Apply"
              styleProp={{width: normalize(80)}}
              textStyleProp={{paddingVertical: normalize(3)}}
              onPress={() => onButtonPress(true)}
              loading={rewardPointsLoading}
            />
          </RenderIf>
          <RenderIf condition={editable}>
            <Button
              label="Cancel"
              styleProp={{width: normalize(80)}}
              textStyleProp={{paddingVertical: normalize(3)}}
              onPress={() => onButtonPress(false)}
              loading={rewardPointsLoading}
            />
          </RenderIf>
        </View>
      </View>
    </View>
  );
};

export default React.memo(
  withProfiler(RewardPointsBlock, {name: 'RewardPointsBlock'}),
);
