import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [CatsModule, DogsModule, SubjectsModule],
})
export class AppModule {}
