import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn().mockImplementation((createUserDto) => {
        return createUserDto;
      }),
      save: jest.fn().mockImplementation((user) => {
        return Promise.resolve({ id: 2, ...user });
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('User create', () => {
    expect(service).toBeDefined();
  });
  it('User findAll', () => {
    expect(service).toBeDefined();
  });
  it('User findOne', () => {
    expect(service).toBeDefined();
  });
  it('User update', () => {
    expect(service).toBeDefined();
  });
});
