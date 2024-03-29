import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/database/abstract.repository';
import { PageSchema } from './models/page.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PagesRepository extends AbstractRepository<PageSchema> {
  protected readonly logger = new Logger(PagesRepository.name);

  constructor(
    @InjectModel(PageSchema.name)
    pagesModel: Model<PageSchema>,
  ) {
    super(pagesModel);
  }
}
