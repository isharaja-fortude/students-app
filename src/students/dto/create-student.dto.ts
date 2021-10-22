import { Field, InputType } from '@nestjs/graphql';

@InputType('StudentDto')
export class CreateStudentDto {
  @Field()
  name: string;

  @Field()
  dob: string;

  @Field()
  address: string;

  @Field()
  mobileNo: string;

  @Field()
  gender: string;

  @Field()
  id?: number;
}
