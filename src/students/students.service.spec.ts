import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './dto/student.dto';
import { NotificationService } from './notification/notification.service';
import { StudentsRepository } from './students.repository';
import { StudentsService } from './students.service';

describe('StudentsService', () => {
  let repository: StudentsRepository;
  let notificationService: NotificationService;
  let service: StudentsService;
  const studentsOutput = [
    {
      id: 1,
      name: 'Ishara',
      dob: new Date('1996-07-20T17:30:00.000Z'),
      age: 25,
      address: 'kottawa',
      gender: 'male',
      mobileNo: '0767223361',
    },
  ];

  const studentsInput = [
    {
      name: 'Ishara',
      dob: '1996-07-20T17:30:00.000Z',
      address: 'kottawa',
      gender: 'male',
      mobileNo: '0767223361',
    },
  ];

  beforeEach(async () => {
    repository = new StudentsRepository();
    notificationService = new NotificationService();
    service = new StudentsService(repository, notificationService);
    (repository as unknown as any).find = jest
      .fn()
      .mockResolvedValue(studentsOutput);
    (repository as unknown as any).save = jest
      .fn()
      .mockResolvedValue(studentsOutput[0]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of students', async () => {
    const s = await service.findAll(10, 0);
    expect(s).toBeInstanceOf(Array);
  });

  it('should return the saved student', async () => {
    (repository as unknown as any).save = jest
      .fn()
      .mockResolvedValueOnce(studentsOutput[0]);

    const createdStudent = await service.addStudent(studentsInput[0]);
    expect(createdStudent).toBe(studentsOutput[0]);
  });

  it('should return an array of students', async () => {
    (repository as unknown as any).save = jest
      .fn()
      .mockResolvedValueOnce(studentsOutput);

    const s = await service.bulkUpload(studentsInput);

    expect(s).toBeInstanceOf(Array);
  });

  it('should send the notification when an error thrown from bulk upload', async () => {
    (repository as unknown as any).save = jest.fn().mockImplementation((e) => {
      throw new Error();
    });
    notificationService.sendNotification = jest.fn().mockResolvedValue(null);
    await service.bulkUpload(studentsInput);
    expect(notificationService.sendNotification).toBeCalled();
  });
});
