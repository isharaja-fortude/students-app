import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StudentInput {
  @Field()
  name: string;

  @Field()
  dob: string;

  @Field()
  address: string;

  @Field()
  gender: string;

  @Field()
  mobileNo: string;
}
