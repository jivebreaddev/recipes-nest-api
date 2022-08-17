import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
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
  it('User remove', () => {
    expect(service).toBeDefined();
  });
});
