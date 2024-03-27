import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesRepository } from './pages.repository';

@Injectable()
export class PagesService {

  constructor(private readonly pageRepository: PagesRepository) {}

  create(createPageDto: CreatePageDto) {
    return this.pageRepository.create({
      ...createPageDto,
      timestamp: new Date(),
      userId: '123',
      isArchived: false,
      published: false
    })
  }

  findAll(parentPageId: string) {
    return this.pageRepository.findAll({parentDocumentId: parentPageId})
  }

  findOne(id: string) {
    return this.pageRepository.findOne({_id: id});
  }

  update(id: string, updatePageDto: UpdatePageDto) {
    return this.pageRepository.findOneAndUpdate({_id: id}, {
      $set: updatePageDto
    });
  }

  remove(id: string) {
    return this.pageRepository.findOneAndDelete({_id: id});
  }
}
