import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { userStub } from '../user/stubs/user.stub';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UserService>;
  let userInput;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUserService = {
      findOne: (username: string) => {
        const filteredUsers = users.filter(
          (user) => user.username === username,
        );
        return Promise.resolve(filteredUsers[0]);
      },
      create: (createUserDto: CreateUserDto) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          username: createUserDto.username,
          password: createUserDto.password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    fakeUserService = module.get<UserService>(UserService);
    userInput = userStub();
  });

  it('SignUp User POST /user successful', async () => {
    const user = await service.signUp(userInput.username, userInput.password);
    expect(user.username).toEqual(userInput.username);
    expect(user.password).toEqual(userInput.password);
  });

  it('SignUp User POST /user username Exists Error', async () => {
    await service.signUp(userInput.username, userInput.password);
    await expect(
      service.signUp(userInput.username, userInput.password),
    ).rejects.toThrow(BadRequestException);
  });

  it('SignUp User POST /user password Too Short', async () => {
    await expect(service.signUp(userInput.username, '12346')).rejects.toThrow(
      BadRequestException,
    );
  });
  it('SignIn User POST /user Successful', async () => {
    await service.signUp(userInput.username, userInput.password);
    const user = await service.signIn(userInput.username, userInput.password);
    expect(user).toBeDefined();
  });
  it('SignIn User POST /user Failed', async () => {
    await expect(
      service.signIn(userInput.username, userInput.password),
    ).rejects.toThrow(NotFoundException);
  });
});
