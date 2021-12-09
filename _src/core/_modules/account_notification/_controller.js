import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {withProfiler} from '@sentry/react-native';
import {navigateTo} from '@app/helpers/Navigation';
import {modules} from '@root/swift.config';

import {
  GET_NOTIFICATIONS,
  READ_NOTIFICATION,
} from '@app/_modules/account_notification/services/schema';
import Views from '@app/_modules/account_notification/_view';

const NotificationList = () => {
  if (!modules.account_notification.enable) {
    return null;
  }

  const [notifications, setNotifications] = useState([]);
  const {data, loading} = useQuery(GET_NOTIFICATIONS);
  const [readNotificationHook] = useMutation(READ_NOTIFICATION);

  useEffect(() => {
    if (data) {
      setNotifications(data.customerNotificationList.items);
    }
  }, [data]);

  const readNotification = entityId => {
    const notification = notifications.filter(
      notif => notif.entityId === entityId,
    );
    readNotificationHook({
      variables: {
        entityId,
      },
    });
    navigateTo(
      modules.account_notification_detail.enable,
      modules.account_notification_detail.name,
      notification[0],
    );
  };

  return (
    <Views
      notifications={notifications}
      readNotification={readNotification}
      loading={loading}
    />
  );
};

export default withProfiler(NotificationList, {name: 'NotificationList'});
