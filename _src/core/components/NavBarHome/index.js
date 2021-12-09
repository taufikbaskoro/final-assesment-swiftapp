import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {normalize} from '@app/styles/mixins';
import {Colors, Mixins} from '@app/styles';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';
import {withProfiler} from '@sentry/react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '@app/components/AddonSearchBar';
import Section from '@app/components/Section';

const AtomNavBar = () => {
  const NavIcon = withProfiler(
    ({name, onPress}) => {
      return (
        <Icon
          name={name}
          size={normalize(25)}
          color={Colors.PRIMARY}
          style={styles.navIcon}
          onPress={onPress}
        />
      );
    },
    {name: 'NavIcon'},
  );

  return (
    <Section
      height={normalize(50)}
      row
      width={Mixins.MAX_WIDTH}
      alignCenter
      spaceAround
      style={{...Mixins.boxShadow('#f2f2f2', 5)}}>
      <Image
        source={require('@app/assets/images/swift-logo.png')}
        style={styles.logoImage}
      />
      <SearchBar />
      <Section row hmargin>
        <NavIcon
          name="ios-receipt-outline"
          onPress={() =>
            navigateTo(
              modules.account_trackorder.enable,
              modules.account_trackorder.name,
            )
          }
        />
        <NavIcon
          name="ios-cart"
          onPress={() => navigateTo(modules.cart.enable, modules.cart.name)}
        />
        <NavIcon
          name="ios-notifications-outline"
          onPress={() =>
            navigateTo(
              modules.account_notification.enable,
              modules.account_notification.name,
            )
          }
        />
      </Section>
    </Section>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    resizeMode: 'contain',
    height: normalize(30),
  },

  navIcon: {
    marginHorizontal: normalize(10),
  },
});

export default withProfiler(AtomNavBar, {name: 'NavBar'});
