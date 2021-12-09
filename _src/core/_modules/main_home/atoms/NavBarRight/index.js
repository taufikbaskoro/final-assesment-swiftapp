import React from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native-paper';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

import IconFeather from 'react-native-vector-icons/Feather';
import styles from '@app/_modules/main_home/atoms/NavBarRight/styles';

const NavBarRightView = () => {
  /**
   * ---------------------------------------------------- *
   * @function {onNavigateTrackNotification}
   * @summary for navigate to notification page
   * ---------------------------------------------------- *
   */
  const onNavigateTrackNotification = () => {
    navigateTo(
      modules.account_notification.enable,
      modules.account_notification.name,
    );
  };

  /**
   * ---------------------------------------------------- *
   * @function {onNavigateTrackOrder}
   * @summary for navigate to track order page
   * ---------------------------------------------------- *
   */
  const onNavigateTrackOrder = () => {
    navigateTo(
      modules.account_trackorder.enable,
      modules.account_trackorder.name,
    );
  };

  return (
    <View style={styles.navbarRightFrame}>
      <View style={styles.navbarRightIconFrame}>
        <IconFeather
          name="file-text"
          color={Colors.white}
          onPress={() => onNavigateTrackOrder()}
          size={18}
        />
      </View>
      <View style={styles.navbarRightIconFrame}>
        <IconFeather
          name="bell"
          color={Colors.white}
          onPress={() => onNavigateTrackNotification()}
          size={18}
        />
      </View>
    </View>
  );
};

export default NavBarRightView;
