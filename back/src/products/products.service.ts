import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProductsDb(page, limit);
  }

  getProduct(id: string) {
    return this.productsRepository.getProductDb(id);
  }

  createProduct() {
    return this.productsRepository.createProduct();
  }

  updateProduct(id: string, newUser: any) {
    return this.productsRepository.updateProductDb(id, newUser);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProductDb(id);
  }
}
