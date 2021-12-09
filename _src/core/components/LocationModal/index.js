import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {normalize} from '@app/styles/mixins';
import {withProfiler} from '@sentry/react-native';
import {FlatList, Modal, TouchableHighlight} from 'react-native';

import Input from '@app/components/Input';
import NavBar from '@app/components/NavBar';
import Section from '@app/components/Section';
import Text from '@app/components/Text';

const LocationModal = ({
  visible = false,
  list,
  title = '',
  onSelectItem,
  onBackBackButtonPress,
}) => {
  const [searchText, setSearchText] = useState('');
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    if (list) {
      setResultList(list);
    }
  }, [list]);

  useEffect(() => {
    if (searchText === '') {
      setResultList(list);
    } else {
      let newResult = list.filter(item => {
        return item.name.toLowerCase().search(searchText.toLowerCase()) !== -1;
      });
      setResultList(newResult);
    }
  }, [searchText]);

  const renderItem = ({item}) => {
    return (
      <Section
        onPress={() => onSelectItem(item)}
        height={normalize(40)}
        alignStart
        maxWidth
        hpadding2>
        <Text>{typeof item === 'string' ? item : item.name}</Text>
      </Section>
    );
  };

  return (
    <Modal visible={visible} onRequestClose={onBackBackButtonPress}>
      {/* TODO : fix -> bug : NavBar is blocked in modal, back button can't be clicked */}
      {/* temporary fix : touchable highlight */}
      <TouchableHighlight onPress={onBackBackButtonPress}>
        <NavBar title={title} onBack={onBackBackButtonPress} />
      </TouchableHighlight>
      <Section flex centerChildren>
        <Input
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          style={{flex: 1}}
          data={resultList}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          ListEmptyComponent={<ActivityIndicator />}
        />
      </Section>
    </Modal>
  );
};

export default withProfiler(LocationModal, {name: 'LocationModal'});
