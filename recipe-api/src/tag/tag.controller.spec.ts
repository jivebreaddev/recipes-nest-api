import { Test, TestingModule } from '@nestjs/testing';
import { CreateRecipeDto } from 'src/recipe/dto/create-recipe.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { tagStub } from './stubs/tag.stub';
import { updatedTagStub } from './stubs/tag.updated.stub';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

describe('TagController', () => {
  let controller: TagController;
  //fake service needed
  let fakeTagService: Partial<TagService>;
  beforeEach(async () => {
    fakeTagService = {
      create: async (createRecipeDto: CreateRecipeDto) => {
        return Promise.resolve(createRecipeDto);
      },
      findOne: async (id: number) => {
        return Promise.resolve(tagStub());
      },
      findAll: async () => {
        return Promise.resolve([tagStub(), tagStub()]);
      },
      update: async (id: number, updateTagDto: UpdateTagDto) => {
        return Promise.resolve(updatedTagStub());
      },
      remove: async (id: number) => {
        return Promise.resolve(tagStub());
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [{ provide: TagService, useValue: fakeTagService }],
    }).compile();

    controller = module.get<TagController>(TagController);
    fakeTagService = module.get<TagService>(TagService);
  });
  it('SignIn is required', async () => {
    expect('Hello World!').toEqual('Hello World!');
  });

  it('GET /tag ', async () => {
    const tag = await controller.findOne(tagStub().id.toString());

    expect(tag.id).toEqual(tagStub().id);
  });
  it('POST /tag create', async () => {
    const tag = await controller.create({
      id: tagStub().id,
      title: tagStub().title,
    });

    expect(tag.id).toEqual(tagStub().id);
    expect(tag.title).toEqual(tagStub().title);
  });
  it('POST /tag update', async () => {
    const tag = await controller.update(tagStub().id.toString(), {
      id: updatedTagStub().id,
      title: updatedTagStub().title,
    });
    expect(tag.id).toEqual(updatedTagStub().id);
  });
});
