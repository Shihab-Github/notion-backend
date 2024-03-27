import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractSchema } from "src/database/abstract.schema";

@Schema({versionKey: false})
export class PageSchema extends AbstractSchema {
    @Prop()
    title: string;

    @Prop()
    isArchived?: Boolean;

    @Prop()
    published?: Boolean;

    @Prop()
    timestamp: Date;

    @Prop()
    userId: string;

    @Prop()
    parentDocumentId?: string;
}

export const PageSchemaDb = SchemaFactory.createForClass(PageSchema)