import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const AppBarComponent = ({useBack, title, subtitle}) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{elevation: 0}}>
      {useBack && (
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
};

export default AppBarComponent;
