import Appbar from '@app/components/AppBar';
import RenderIf from '@app/components/RenderIf';
import Section from '@app/components/Section';
import Text from '@app/components/Text';
import {Colors} from '@app/styles';

import React from 'react';
import {ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';

import styles from '@app/_modules/account_notification/styles';

function NotificationScreen({notifications, readNotification, loading}) {
  const NotificationItem = withProfiler(
    ({notification, onPress}) => {
      return (
        <Section style={styles.barContainer} onPress={onPress}>
          <Text
            style={[
              {
                color: notification.unread ? Colors.BLACK : Colors.GRAY_MEDIUM,
              },
            ]}>
            {notification.subject}
          </Text>
        </Section>
      );
    },
    {name: 'NotificationItem'},
  );

  return (
    <>
      <Appbar useBack title="Notifications" />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        <RenderIf condition={!loading && notifications.length === 0}>
          <Text style={[styles.marginSpacing]}>No Notifications</Text>
        </RenderIf>
        <RenderIf condition={!loading}>
          {notifications.map((notification, index) => {
            return (
              <NotificationItem
                notification={notification}
                onPress={() => readNotification(notification.entityId)}
                key={notification.subject + '' + index}
              />
            );
          })}
        </RenderIf>
        <RenderIf condition={loading}>
          <ActivityIndicator style={styles.marginSpacing} />
        </RenderIf>
      </ScrollView>
    </>
  );
}

export default withProfiler(NotificationScreen, {name: 'NotificationScreen'});
