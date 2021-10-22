import { Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { StudentEntity } from '../students.entity';

@EventSubscriber()
export class StudentSubscriber
  implements EntitySubscriberInterface<StudentEntity>
{
  private readonly logger: Logger = new Logger('StudentSubscriber');
  constructor(
    @InjectConnection() readonly connection: Connection,
    private notificationService: NotificationService,
  ) {
    connection.subscribers.push(this);
  }

  afterInsert(event: InsertEvent<StudentEntity>): void {
    this.logger.log('students entity after insert event triggered');
    this.notificationService.sendNotification({
      message: 'successfully saved',
      notificationType: 'create',
      title: 'created',
    });
  }

  afterRemove(event: RemoveEvent<StudentEntity>): void {
    this.logger.log('students entity after remove event triggered');
    this.notificationService.sendNotification({
      message: 'successfully removed',
      notificationType: 'remove',
      title: 'removed',
    });
  }

  afterUpdate(event: UpdateEvent<StudentEntity>): void {
    this.logger.log('students entity after update event triggered');
    this.notificationService.sendNotification({
      message: 'successfully updated',
      notificationType: 'update',
      title: 'updated',
    });
  }
}
