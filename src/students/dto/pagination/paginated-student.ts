import { ObjectType } from '@nestjs/graphql';
import { Student } from '../student.dto';
import { Paginated } from './paginated';

@ObjectType('PaginatedStudent')
export class PaginatedStudent extends Paginated(Student) {}
