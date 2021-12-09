import React from 'react';
import {View} from 'react-native';
import Text from '@app/components/Text';
import {useTranslation} from 'react-i18next';

const NoData = ({condition, children}) => {
  const {t} = useTranslation();
  return (
    <View style={{marginVertical: 30}}>
      <Text center> {t('label.noData')}</Text>
    </View>
  );
};

export default NoData;
