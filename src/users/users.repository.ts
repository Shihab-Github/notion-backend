import { Injectable } from '@nestjs/common';
import { AbstractRepository } from 'src/database/abstract.repository';
import { UserSchema } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserSchema> {
  constructor(@InjectModel(UserSchema.name) userModel: Model<UserSchema>) {
    super(userModel);
  }
}
