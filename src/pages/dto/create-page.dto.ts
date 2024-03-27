import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    parentDocumentId: string | null;
}
