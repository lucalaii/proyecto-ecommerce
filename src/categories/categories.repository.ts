import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async createCategories() {
    await Promise.all(
      data?.map(async (elem) => {
        return await this.categoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: elem.category })
          .orIgnore()
          .execute();
      }),
    );
    return 'Categorias agregadas';
  }
}
