import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  age: number;

  breed: string;
}
