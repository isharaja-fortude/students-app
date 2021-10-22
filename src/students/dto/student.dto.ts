import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class Student {
  @Field()
  id?: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  dob: string;

  @Field()
  age?: number;

  @Field()
  mobileNo: string;

  @Field()
  gender: string;
}
