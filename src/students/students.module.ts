import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { StudentsRepository } from './students.repository';
import { StudentEntity } from './students.entity';
import { StudentsResolver } from './students.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { StudentSubscriber } from './subscriber/students.subscriber';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentEntity, StudentsRepository]),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [
    StudentsResolver,
    StudentsService,
    StudentSubscriber,
    NotificationService,
  ],
})
export class StudentsModule {}
