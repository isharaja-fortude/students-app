import { Logger } from '@nestjs/common';
import { Args, Resolver, Query, Mutation, Subscription } from '@nestjs/graphql';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentInput } from './dto/student-input.dto';
import { Student } from './dto/student.dto';
import { StudentsService } from './students.service';

@Resolver((of) => Student)
export class StudentsResolver {
  private readonly logger: Logger = new Logger('StudentsResolver');

  constructor(private studentsService: StudentsService) {}

  @Query((returns) => [Student])
  async students(@Args('take') take: number, @Args('skip') skip: number) {
    this.logger.log('Query received for find all the students');
    return await this.studentsService.findAll(take, skip);
  }

  @Mutation((returns) => Student)
  async addStudent(@Args('student') student: StudentInput) {
    this.logger.log('Mutation received to add a student');
    return await this.studentsService.addStudent(student);
  }

  @Mutation((returns) => [Student])
  async upload(
    @Args({ name: 'students', type: () => [StudentInput] })
    students: [StudentInput],
  ): Promise<Student[]> {
    this.logger.log('Mutation received to upload a list of students');
    return await this.studentsService.bulkUpload(students);
  }

  @Mutation((returns) => Student)
  async updateStudent(@Args('student') student: CreateStudentDto) {
    this.logger.log('Mutation received to update a student');
    return await this.studentsService.addStudent(student);
  }

  @Mutation((returns) => Student)
  async deleteStudent(@Args('id') id: string): Promise<{ id: string }> {
    this.logger.log('Mutation received to delete a student');
    await this.studentsService.deleteStudent(id);
    console.log(id);
    return { id: id };
  }
}
