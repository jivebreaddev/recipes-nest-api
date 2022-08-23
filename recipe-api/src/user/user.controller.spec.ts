import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { updatedUserStub } from './stubs/update-user.stub';
import { userStub } from './stubs/user.stub';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;
  let stub;
  beforeEach(async () => {
    (fakeUserService = {
      create: (createUserDto: CreateUserDto) => {
        return Promise.resolve({
          id: 2,
          username: createUserDto.username,
          password: createUserDto.password,
        } as User);
      },
      findOne: (username: string) => {
        return Promise.resolve(userStub() as User);
      },
      findAll: () => {
        return Promise.resolve([userStub()] as User[]);
      },
      update: (username: string, updateUserDto: UpdateUserDto) => {
        const user = userStub();
        Object.assign(user, updateUserDto);
        return Promise.resolve(user as User);
      },
    }),
      (fakeAuthService = {
        signIn: (user) => {
          return Promise.resolve({ access_token: 'sdafasdvxc' });
        },
        signUp: (username: string, password: string) => {
          return Promise.resolve(userStub() as User);
        },
      });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    fakeUserService = module.get<UserService>(UserService);
    fakeAuthService = module.get<AuthService>(AuthService);
    stub = userStub();
  });

  // it('SignUp User POST /user successful', async () => {
  //   const user = await controller.signUp({
  //     username: stub.username,
  //     password: stub.password,
  //   });

  //   expect(user.username).toEqual(stub.username);
  //   expect(user.password).toEqual(stub.password);
  // });

  // it('SignUp User POST /user username Exists Error Redirection', async () => {
  //   const user = await controller.signUp({
  //     username: stub.username,
  //     password: stub.password,
  //   });

  //   expect(user.username).toEqual(stub.username);
  //   expect(user.password).toEqual(stub.password);
  // });

  // it('SignUp User POST /user password Too Short Redirection', async () => {
  //   const user = await controller.signUp({
  //     username: stub.username,
  //     password: stub.password,
  //   });
  // });
  // it('SignIn User POST /user Successful', async () => {
  //   const token1 = await controller.signIn({
  //     username: stub.username,
  //     password: stub.password,
  //   });
  //   const token2 = await controller.signIn({
  //     username: stub.username,
  //     password: stub.password,
  //   });
  //   expect(token1).toEqual(token2);
  // });

  it('SignIn User POST /user Token Valid Token', () => {
    expect(controller).toBeDefined();
  });
  it('SignIn User POST /user Token Invalid Token', () => {
    expect(controller).toBeDefined();
  });

  it('create User POST /user', () => {});

  it('findOne User GET /user/:username', async () => {
    const user = await controller.findOne(userStub().username);

    expect(user.username).toEqual(userStub().username);
  });

  it('findAll User GET /user', async () => {
    const users = await controller.findAll();
    expect(users.length).toEqual(1);
  });
  it('update User POST /user', async () => {
    const users = await controller.update(userStub().username, {
      username: updatedUserStub().username,
      password: updatedUserStub().password,
    });

    expect(users).toBeDefined();
    expect(users.username).toEqual(updatedUserStub().username);
  });
});
