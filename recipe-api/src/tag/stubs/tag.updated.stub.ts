import { Tag } from '../entities/tag.entity';

export const updatedTagStub = (): Tag => {
  return {
    id: 3,
    title: 'Updated',
  };
};
