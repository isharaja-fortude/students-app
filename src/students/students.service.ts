import { Injectable, Logger } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './dto/student.dto';
import { NotificationService } from './notification/notification.service';
import { StudentEntity } from './students.entity';
import { StudentsRepository } from './students.repository';
import { AgeCalculator } from './util/age-calculator.util';

@Injectable()
export class StudentsService {
  private readonly logger: Logger = new Logger('StudentsService');
  constructor(
    private studentRepository: StudentsRepository,
    private notificationService: NotificationService,
  ) {}

  /**
   * get all the students from DB and return the StudentDtos
   * @returns StudentDto array
   */
  async findAll(take: number, skip: number): Promise<Student[]> {
    this.logger.log('findAll function triggered');
    const students: StudentEntity[] = await this.studentRepository.find({
      take,
      skip,
    });
    const ageCalculator: AgeCalculator = new AgeCalculator();
    const studentsDto: Student[] = students.map((student: StudentEntity) => {
      const stu: Student = new Student();
      stu.id = student.id;
      stu.name = student.name;
      stu.age = ageCalculator.calculate(student.dob);
      stu.address = student.address;
      stu.gender = student.gender;
      stu.mobileNo = student.mobileNo;
      stu.dob = student.dob.toDateString();
      return stu;
    });
    this.logger.log('retrieved all the students from DB');
    return studentsDto;
  }

  /**
   * delete student from DB using the ID
   * @param id student's ID to be deleted.
   */
  async deleteStudent(id: string): Promise<string> {
    try {
      await this.studentRepository.delete(id);
      this.logger.log(`Deleted student ID ${id} from the DB`);
    } catch (error) {
      this.logger.error(`Couldnt delete the student ${id}`);
      this.notificationService.sendNotification({
        message: 'Couldnt delete the student',
        notificationType: 'error',
        title: 'Error occurred',
      });
    }
    return id;
  }

  async addStudent(createStudentDto: CreateStudentDto): Promise<any> {
    try {
      this.logger.log('started adding the student to DB');
      let student: StudentEntity;
      if (createStudentDto.id) {
        student = await this.studentRepository.findOne({
          id: createStudentDto.id,
        });
      } else {
        student = new StudentEntity();
      }
      student.name = createStudentDto.name;
      student.dob = new Date(createStudentDto.dob);
      student.gender = createStudentDto.gender;
      student.mobileNo = createStudentDto.mobileNo;
      student.address = createStudentDto.address;
      this.logger.log('Student is successfully added to the DB');
      return this.studentRepository.save(student);
    } catch (error) {
      this.logger.error('Couldnt add the student to the DB');
      this.notificationService.sendNotification({
        message: 'Couldnt add the student',
        notificationType: 'error',
        title: 'Error occurred',
      });
    }
  }

  /**
   * add students list to DB
   * @param studentsDto list of student dtos to be added
   * @returns student dto object array
   */
  async bulkUpload(studentsDto: CreateStudentDto[]): Promise<Student[]> {
    try {
      this.logger.log('Students list is successfully added to the DB');
      return await this.studentRepository.save(studentsDto);
    } catch (error) {
      this.logger.error('Couldnt add the list of students to the DB');
      this.notificationService.sendNotification({
        message: 'Couldnt add the list of students',
        notificationType: 'error',
        title: 'Error occurred',
      });
    }
    return studentsDto;
  }
}
