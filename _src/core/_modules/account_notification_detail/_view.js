import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {formatDateNotif} from '@app/helpers/General';

import NavBar from '@app/components/NavBar';
import Text from '@app/components/Text';
import styles from '@app/_modules/account_notification_detail/styles';

function NotificationScreen({notification}) {
  if (!notification) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <NavBar title="Notifications" />
      <View style={styles.mainContainer}>
        <Text style={[styles.titleText]}>{notification.subject}</Text>
        <Text style={[styles.dateText]}>
          {formatDateNotif(notification.createdAt)}
        </Text>
        <Text>{notification.content}</Text>
      </View>
    </>
  );
}

export default withProfiler(NotificationScreen, {name: 'NotificationScreen'});
