import React from 'react';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
const AppBarComponent = ({useBack, title, subtitle}) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{elevation: 0, backgroundColor: '#FF9393'}}>
      {useBack && (
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content color="white" title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
};

export default AppBarComponent;
