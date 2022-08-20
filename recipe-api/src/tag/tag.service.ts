import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private repository: Repository<Tag>) {}
  async create(createTagDto: CreateTagDto) {
    const tag = await this.repository.create({
      id: createTagDto.id,
      title: createTagDto.title,
    });

    this.repository.save(tag);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findBy({ id: id });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException('Not Found Exception');
    }
    return await this.repository.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException('Not Found Exception');
    }
    return await this.repository.remove(tag);
  }
}
