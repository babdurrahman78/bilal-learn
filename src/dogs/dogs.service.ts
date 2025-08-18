import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Dog } from './interfaces/dog.interface';

@Injectable()
export class DogsService {
  private readonly dogs: Dog[] = [];

  create(dog: Omit<Dog, 'id'>) {
    try {
      const id = this.dogs.length + 1;
      if (this.dogs.some((item) => item.name === dog.name)) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: `Dog with name ${dog.name} already exists`,
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }
      this.dogs.push({
        ...dog,
        id,
      });

      return {
        message: 'Berhasil Menambahkan data',
        data: {
          name: dog.name,
          age: dog.age,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: number) {
    try {
      const dog = this.dogs.find((item) => item.id === id);

      if (!dog) {
        throw new NotFoundException(`Dog with id ${id} not found`);
      }

      return {
        success: true,
        data: dog,
      };
    } catch (err) {
      throw err;
    }
  }

  delete(id: number) {
    try {
      let selectedIndex: number | null = null;

      this.dogs.find((item, index) => {
        if (item.id === id) {
          selectedIndex = index;
        }
      });

      if (selectedIndex === null) {
        throw new NotFoundException(`Dog with id ${id} not found`);
      }

      this.dogs.splice(selectedIndex, 1);

      return {
        success: true,
        message: 'success deleting dog with id ' + id,
      };
    } catch (err) {
      throw err;
    }
  }
}
