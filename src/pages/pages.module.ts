import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PagesRepository } from './pages.repository';
import { PageSchema, PageSchemaDb } from './models/page.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: PageSchema.name, schema: PageSchemaDb },
    ]),
  ],
  controllers: [PagesController],
  providers: [PagesService, PagesRepository],
})
export class PagesModule {}
