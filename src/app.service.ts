import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.categoriesService.createCategories();
      console.log('Categories initialized.');
      await this.productsService.createProduct();
      console.log('Products initialized.');
    } catch (error) {
      console.error('Error during application bootstrap:', error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
