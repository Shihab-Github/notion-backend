import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractSchema } from './abstract.schema';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    const data = (await newDocument.save()).toJSON() as unknown as TDocument;
    return data;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
    }).lean<TDocument>(true);

    if (!document) {
        throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findAll(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const documents = await this.model.find(filterQuery).lean<TDocument[]>(true)
    return documents
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    const deletedDocument = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true)
    return deletedDocument
  }
}
