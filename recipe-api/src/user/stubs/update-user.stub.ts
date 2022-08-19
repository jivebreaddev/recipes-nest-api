import { User } from '../entities/user.entity';

export const updatedUserStub = (): Partial<User> => {
  return {
    username: 'updated',
    password: 'updated',
  };
};
