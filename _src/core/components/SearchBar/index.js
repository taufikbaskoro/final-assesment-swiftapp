import React, {useRef, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import {TouchableRipple, Text, Colors} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

import PropTypes from 'prop-types';
import IconIon from 'react-native-vector-icons/Ionicons';
import RenderIf from '@app/components/RenderIf';
import styles from '@app/components/SearchBar/styles';

const SearchBar = ({useSearch, searchText, onSearchTextChange}) => {
  /**
   * ---------------------------------------------------- *
   * @constant {hooks}
   * ---------------------------------------------------- *
   */
  const {t} = useTranslation();
  const searchInputRef = useRef(null);
  const mount = useRef();

  /**
   * ---------------------------------------------------- *
   * @constant {lifecycle}
   * ---------------------------------------------------- *
   */
  useEffect(() => {
    mount.current = true;
    if (mount.current) {
      searchInputRef?.current?.focus();
    }
    return () => (mount.current = false);
  }, []);

  return (
    <TouchableRipple
      underlayColor={Colors.white}
      style={styles.frameSearchbar}
      onPress={() => {
        navigateTo(modules.main_search.enable, modules.main_search.name);
      }}>
      <View style={styles.frameSearchInput}>
        <IconIon name="search" color={Colors.grey400} size={16} />
        <RenderIf condition={useSearch}>
          <TextInput
            ref={searchInputRef}
            value={searchText}
            style={styles.frameSearchText}
            placeholder={t('textPlaceholder.search') + '...'}
            onChangeText={text => onSearchTextChange(text)}
          />
        </RenderIf>
        <RenderIf condition={!useSearch}>
          <Text style={[styles.frameSearchText, {color: Colors.grey400}]}>
            {t('textPlaceholder.search') + '...'}
          </Text>
        </RenderIf>
      </View>
    </TouchableRipple>
  );
};

SearchBar.propTypes = {
  // use for displaying search can be input:true or touch:false
  useSearch: PropTypes.bool,
  // event for search text change
  onSearchTextChange: PropTypes.func,
};

export default SearchBar;
