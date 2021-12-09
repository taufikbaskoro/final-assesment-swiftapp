import gql from 'graphql-tag';

export const GET_NOTIFICATIONS = gql`
  query {
    customerNotificationList {
      items {
        createdAt
        entityId
        subject
        unread
        content
      }
    }
  }
`;

export const READ_NOTIFICATION = gql`
  mutation readNotification($entityId: Int!) {
    readNotification(entityId: $entityId) {
      items {
        content
        createdAt
        subject
        unread
      }
    }
  }
`;
