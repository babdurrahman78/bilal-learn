import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dog: Omit<Dog, 'id'>) {
    const id = this.dogs.length + 1;
    this.dogs.push({
      ...dog,
      id,
    });
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: number): Dog {
    const dog = this.dogs.find((item) => item.id === id);

    if (!dog) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }

    return dog;
  }
}
