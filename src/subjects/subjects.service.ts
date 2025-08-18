import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Subject } from 'src/subjects/interfaces/subjects.interface';
import { v4 } from 'uuid';

@Injectable()
export class SubjectsService {
  private readonly subjects: Subject[] = [];

  create(subject: Pick<Subject, 'title' | 'description'>) {
    try {
      if (this.subjects.some((item) => item.title === subject.title)) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: `Subject with title "${subject.title}" already exists`,
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
        );
      }

      const data = {
        createdAt: dayjs().toISOString(),
        id: v4(),
        description: subject.description,
        title: subject.title,
        updatedAt: dayjs().toISOString(),
      };

      this.subjects.push(data);
      return {
        message: 'Berhasil Menambahkan data subjects',
        data: {
          id: data.id,
          title: subject.title,
          description: subject.description,
        },
      };
    } catch (err) {
      throw err;
    }
  }

  findAll(): Subject[] {
    return this.subjects;
  }

  findOne(id: string) {
    try {
      const subject = this.subjects.find((item) => item.id === id);

      if (!subject) {
        throw new NotFoundException(`Subject with id ${id} not found`);
      }

      return {
        success: true,
        data: subject,
      };
    } catch (err) {
      throw err;
    }
  }

  delete(id: string) {
    try {
      let selectedIndex: number | null = null;
      let selectedSubject: Subject | null = null;

      this.subjects.find((item, index) => {
        if (item.id === id) {
          selectedIndex = index;
          selectedSubject = item;
        }
      });

      if (selectedIndex === null) {
        throw new NotFoundException(`Subject with id ${id} not found`);
      }

      this.subjects.splice(selectedIndex, 1);

      return {
        success: true,
        message: 'success deleting Subject with id ' + id,
        data: selectedSubject,
      };
    } catch (err) {
      throw err;
    }
  }

  update(id: string) {
    try {
    } catch (err) {
      throw err;
    }
  }
}
