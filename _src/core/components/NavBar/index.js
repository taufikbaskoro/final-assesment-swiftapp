import React from 'react';
import {View, Image} from 'react-native';
import {Appbar, Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import PropTypes from 'prop-types';
import SearchBar from '@app/components/SearchBar';
import styles from '@app/components/NavBar/styles';

const NavBar = ({
  useLogo = false,
  useBack = false,
  useBackPress,
  useSearch = false,
  searchText,
  onSearchTextChange,
  childrenRight,
  title,
  subtitle,
}) => {
  /**
   * ---------------------------------------------------- *
   * @var {hooks}
   * ---------------------------------------------------- *
   */
  const navigation = useNavigation();

  if (useLogo || useSearch) {
    let widthCenterSection = useBack ? '67%' : '58%';
    if (!childrenRight) {
      widthCenterSection = '75%';
    }
    return (
      <Appbar.Header>
        <View style={styles.frameNavbar}>
          {useBack && (
            <Appbar.BackAction
              color={Colors.white}
              onPress={() => navigation.goBack()}
            />
          )}
          {!useBack && (
            <View style={styles.frameBackButton}>
              <Image
                source={require('@app/assets/images/swift-logo-white.png')}
                style={styles.frameLogo}
              />
            </View>
          )}
          <View style={[styles.frameSearch, {width: widthCenterSection}]}>
            <SearchBar
              useSearch={useSearch}
              searchText={searchText}
              onSearchTextChange={onSearchTextChange}
            />
          </View>
          <View style={styles.frameRightChildren}>{childrenRight}</View>
        </View>
      </Appbar.Header>
    );
  }

  const onBackPress = useBackPress ? useBackPress : () => navigation.goBack();
  return (
    <Appbar.Header>
      {useBack && (
        <Appbar.BackAction color={Colors.white} onPress={onBackPress} />
      )}
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
};

NavBar.propTypes = {
  // use for displaying logo or not
  useLogo: PropTypes.bool,
  // use for displaying back button or not
  useBack: PropTypes.bool,
  // use for displaying search can be input:true or touch:false
  useSearch: PropTypes.bool,
  // use for embed some component in right side
  childrenRight: PropTypes.element,
  // use for displaying title,
  title: PropTypes.string,
  // use for displaying subtitle,
  subtitle: PropTypes.string,
};

export default NavBar;
