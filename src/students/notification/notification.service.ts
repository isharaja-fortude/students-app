import { Injectable, Logger } from '@nestjs/common';
import { GraphQLClient, gql } from 'graphql-request';

@Injectable()
export class NotificationService {
  private readonly logger: Logger = new Logger('NotificationService');
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient('http://localhost:3003/graphql');
  }

  sendNotification(notification: any) {
    const variables = {
      notification,
    };
    const query = gql`
      query Query($notification: CreateNotificationDto!) {
        sendNotification(notification: $notification) {
          message
          notificationType
          title
        }
      }
    `;
    this.client.request(query, variables);
    this.logger.log('Notification sent : ', notification);
  }
}
