import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType({ isAbstract: true })
@Entity({ name: 'student' })
export class StudentEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  gender: string;

  @Field()
  @Column()
  dob: Date;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  mobileNo: string;
}
