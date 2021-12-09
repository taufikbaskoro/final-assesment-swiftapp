import Section from '@app/components/Section';
import Text from '@app/components/Text';
import {Mixins} from '@app/styles';
import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {withProfiler} from '@sentry/react-native';
import {Appbar, Searchbar, useTheme} from 'react-native-paper';
import Repo from '@app/components/SearchGoogleAutocomplete/services/rest/repository';
import styles from '@app/components/SearchGoogleAutocomplete/styles';

let delayTimer;

const SearchGoogleAutocomplete = ({
  backPress,
  placeholder = '',
  callbackAutocomplete,
}) => {
  const {colors} = useTheme();
  const [isSearch, setIsSearch] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const postSearch = async text => {
    setLoading(true);
    const res = await Repo.Google.getListCity(text);
    const {predictions} = res;
    if (predictions !== undefined) {
      const listCity = [];
      predictions.map(async item => {
        const {place_id} = item;
        const resDetail = await Repo.Google.getListCityDetail(place_id);
        const {result} = resDetail;

        const {name} = result;
        const address = result.formatted_address;
        const {location} = result.geometry;
        const dataItem = {name, address, location};
        listCity.push(dataItem);
        setData(listCity);
      });
    }
    setLoading(false);
  };

  const _onChange = text => {
    setData([]);
    setSearchText(text);
    if (text === '') {
      clearTimeout(delayTimer);
    } else {
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => postSearch(text), 1000);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <Section
        key={`list-city-${index}`}
        activeOpacity={0.8}
        style={[
          styles.itemContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
        onPress={() => {
          setData([]);
          callbackAutocomplete(item);
          setSearchText(item.address);
          setIsSearch(false);
        }}>
        <Text small>{item.address}</Text>
      </Section>
    );
  };

  return (
    <View style={styles.container}>
      {!isSearch ? (
        <Appbar.Header style={{justifyContent: 'space-between'}}>
          <Appbar.BackAction icon={'close'} onPress={backPress} />
          <Appbar.Content title={'Add address'} />
          <Appbar.Action icon={'magnify'} onPress={() => setIsSearch(true)} />
        </Appbar.Header>
      ) : (
        <Appbar.Header>
          <Searchbar
            placeholder={placeholder}
            onChangeText={_onChange}
            value={searchText}
          />
        </Appbar.Header>
      )}

      <Section style={[styles.flatlistContainer]}>
        <FlatList
          data={data}
          renderItem={renderItem}
          scrollEnabled
          style={[
            styles.flatlistContent,
            {
              height: data.length > 0 ? Mixins.MAX_HEIGHT * 0.4 : 0,
            },
          ]}
          keyExtractor={(item, index) => {
            return `list-payment-item-${index}`;
          }}
        />
      </Section>
    </View>
  );
};

export default withProfiler(SearchGoogleAutocomplete, {
  name: 'SearchGoogleAutocomplete',
});
