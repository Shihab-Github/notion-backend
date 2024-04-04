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
      isArchived: false,
      published: false,
    });
  }

  findAll(parentPageId: string, userId: string) {
    return this.pageRepository.findAll({ parentDocumentId: parentPageId, userId, isArchived: false });
  }

  findOne(id: string) {
    return this.pageRepository.findOne({ _id: id });
  }

  update(id: string, updatePageDto: UpdatePageDto) {
    return this.pageRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: updatePageDto,
      },
    );
  }

  remove(id: string) {
    return this.pageRepository.findOneAndDelete({ _id: id });
  }

  async archiveDocument(id: string, updatePageDto: UpdatePageDto) {
    const documents = await this.pageRepository.findAll({parentDocumentId: id})
    
    for(let i = 0; i < documents.length; i++) {
      const item = documents[i];
      await this.pageRepository.findOneAndUpdate(item._id, { isArchived: true})
      this.archiveDocument(item._id.toString(), updatePageDto)
    }
    const document = await this.pageRepository.findOne({_id: id})
    await this.pageRepository.findOneAndUpdate(document._id, { isArchived: true})
    
  }
}
