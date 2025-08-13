import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './interfaces/dog.interface';
import { Response } from 'express';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto, @Res() res: Response) {
    this.dogsService.create(createDogDto);
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      data: {
        name: createDogDto.name,
        age: createDogDto.age,
      },
      message: 'Dog created successfully',
    });
  }

  @Get()
  async findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Dog> {
    return this.dogsService.findOne(+id);
  }
}
