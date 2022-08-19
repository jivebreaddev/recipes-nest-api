import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { userStub } from './stubs/user.stub';
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
      find: jest.fn().mockImplementation(() => {
        return Promise.resolve([userStub()]);
      }),
      findOneBy: jest.fn().mockImplementation((id) => {
        return Promise.resolve(userStub());
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('User create', async () => {
    let dto = userStub();
    const user = await service.create(dto);

    expect(service).toBeDefined();
    expect(user.username).toEqual(dto.username);
    expect(user.password).toEqual(dto.password);
  });
  it('User findAll', async () => {
    const users = await service.findAll();

    expect(service).toBeDefined();
    expect(users.length).toEqual(1);
    expect(users[0].username).toEqual(userStub().username);
  });
  it('User findOne', async () => {
    const users = await service.findOne(userStub().username);

    expect(service).toBeDefined();
    expect(users.username).toEqual(userStub().username);
  });
  it('User update', async () => {
    const user = await service.update(userStub().username, userStub());
    expect(service).toBeDefined();
    expect(user.username).toEqual(userStub().username);
  });
});
