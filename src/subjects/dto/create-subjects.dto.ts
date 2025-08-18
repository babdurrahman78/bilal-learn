import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSubjectsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(10)
  description: string;
}
