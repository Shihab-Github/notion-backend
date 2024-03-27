import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [DatabaseModule, ConfigModule, PagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}