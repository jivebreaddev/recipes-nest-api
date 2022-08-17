import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUserService: UserService;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUserService = {
      findOne: () => {
        const filteredUsers = users.filter(
          (user) => user.username === username,
        );
        return Promise.resolve(filteredUsers);
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

    authService = module.get<AuthService>(AuthService);
    fakeUserService = module.get<UserService>(UserService);
  });

  it('SignUp User POST /user successful', () => {});

  it('SignUp User POST /user username Exists Error', () => {
    expect(service).toBeDefined();
  });

  it('SignUp User POST /user password Too Short', () => {
    expect(service).toBeDefined();
  });
  it('SignIn User POST /user Successful', () => {
    expect(service).toBeDefined();
  });
  it('SignIn User POST /user Failed', () => {
    expect(service).toBeDefined();
  });
});
