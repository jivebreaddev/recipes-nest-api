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
  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

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
        return Promise.resolve(userStub());
      },
      findAll: () => {
        return Promise.resolve([userStub()]);
      },
      update: (username: string, updateUserDto: UpdateUserDto) => {
        const user = userStub();
        Object.assign(user, updateUserDto);
        return Promise.resolve(user);
      },
    }),
      (fakeAuthService = {
        signin: (username: string, password: string) => {
          return Promise.resolve(userStub());
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
  });

  it('SignUp User POST /user successful', () => {
    expect(controller).toBeDefined();
  });

  it('SignUp User POST /user username Exists Error', () => {
    expect(controller).toBeDefined();
  });

  it('SignUp User POST /user password Too Short', () => {
    expect(controller).toBeDefined();
  });
  it('SignIn User POST /user Successful', () => {
    expect(controller).toBeDefined();
  });
  it('SignIn User POST /user Failed', () => {
    expect(controller).toBeDefined();
  });
  it('SignIn User POST /user Token Valid Token', () => {
    expect(controller).toBeDefined();
  });
  it('SignIn User POST /user Token Invalid Token', () => {
    expect(controller).toBeDefined();
  });
});
