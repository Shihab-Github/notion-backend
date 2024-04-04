import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  parentDocumentId: string | null;

  @IsBoolean()
  @IsOptional()
  isArchived: boolean;

  @IsOptional()
  @IsString()
  userId: string
}
