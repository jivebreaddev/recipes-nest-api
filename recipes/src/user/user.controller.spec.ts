import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { userStub } from './stubs/user.stub';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let fakeUsersService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    (fakeUsersService = {
      create: (createUserDto: CreateUserDto) => {
        return Promise.resolve({
          id: 2,
          username: createUserDto.username,
          password: createUserDto.password,
        } as User);
      },
      findOne: (id: number) => {
        return Promise.resolve(userStub());
      },
      findAll: () => {
        return Promise.resolve([userStub()]);
      },
      update: (id: number, updateUserDto: UpdateUserDto) => {
        const user = userStub();
        Object.assign(user, updateUserDto);
        return Promise.resolve(user);
      },
    }),
      (fakeAuthService = {
        signin: (email: string, password: string) => {
          return Promise.resolve(userStub());
        },
      });
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provider: UserService,
          useValue: fakeUsersService,
        },
        {
          provider: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async (done) => {
    fakeUsersService.findOne = () => null;

    try {
      await controller.findUser('1');
    } catch (err) {
      done();
    }
  });
  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      {
        email: 'asdf@asdf.com',
        password: 'asdf',
      },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
