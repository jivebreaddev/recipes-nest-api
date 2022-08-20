import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}
  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagRepository.create({
      title: createTagDto.title,
    });

    return await this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOneBy({ id: id });
    if (!tag) {
      throw new NotFoundException('Not Found Exception');
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException('Not Found Exception');
    }
    return await this.tagRepository.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException('Not Found Exception');
    }
    return await this.tagRepository.remove(tag);
  }
}
