import React from 'react';
import {View, Text} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import {MixinsNew} from '@app/styles/index';

import IconFeather from 'react-native-vector-icons/Feather';
import RenderIf from '@app/components/RenderIf';
import styles from '@app/components/_StateStatus/styles';

const StatusState = ({iconName = 'alert-circle'}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        ...MixinsNew.margin({top: 40}),
      }}>
      <IconFeather name={iconName} size={50} color={Colors.grey400} />
      <Text style={{color: Colors.grey400}}>no data found</Text>
    </View>
  );
};

export default StatusState;
