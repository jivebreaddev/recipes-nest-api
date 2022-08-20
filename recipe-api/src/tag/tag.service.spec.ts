import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { tagStub } from './stubs/tag.stub';
import { updatedTagStub } from './stubs/tag.updated.stub';
import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;
  beforeEach(async () => {
    const fakeRepository = {
      create: jest.fn().mockImplementation((createTagDto: CreateTagDto) => {
        return Promise.resolve(createTagDto);
      }),
      save: jest.fn().mockImplementation((tag) => {
        return Promise.resolve({ id: 3, ...tag });
      }),
      find: jest.fn().mockImplementation(() => {
        return Promise.resolve([tagStub(), tagStub()]);
      }),
      findOneBy: jest.fn().mockImplementation((id: number) => {
        return Promise.resolve(tagStub());
      }),
      update: jest.fn().mockImplementation((id: number, updateTagDto) => {
        return Promise.resolve(updatedTagStub());
      }),
      remove: jest.fn().mockImplementation((id: number) => {
        return Promise.resolve();
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: getRepositoryToken(Tag), useValue: fakeRepository },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('Tag create', async () => {
    let dto = tagStub();
    const tag = await service.create(dto);

    expect(service).toBeDefined();
    expect(tag.id).toEqual(dto.id);
    expect(tag.title).toEqual(dto.title);
  });
  it('Tag findAll', async () => {
    const tag = await service.findAll();

    expect(service).toBeDefined();
    expect(tag.length).toEqual(2);
    expect(tag[0].id).toEqual(tagStub().id);
  });
  it('Tag findOne', async () => {
    const tag = await service.findOne(tagStub().id);

    expect(service).toBeDefined();
    expect(tag.id).toEqual(tagStub().id);
  });
  it('Tag update', async () => {
    const tag = await service.update(tagStub().id, updatedTagStub());
    expect(service).toBeDefined();
    expect(tag.id).toEqual(updatedTagStub().id);
  });
});
