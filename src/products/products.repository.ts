import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import data from '../utils/data.json';
@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getAllProductsDb(page: number, limit: number): Promise<Products[]> {
    const start = (page - 1) * limit;
    const end = start + limit;

    const products = await this.productsRepository.find({
      relations: {
        categories: true,
      },
    });

    const pageProduct = products.slice(start, end);

    return pageProduct;
  }

  async getProductDb(id: string): Promise<Products | string> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async createProduct() {
    //Traigo el array de categorias
    const categories = await this.categoriesRepository.find();
    //Mapeo la data donde estan los productos para ver si cumplen con las categorias
    await Promise.all(
      data?.map(async (elem) => {
        const category = categories.find(
          (category) => category.name === elem.category,
        );

        // Si cumplen, creo el producto guiándome con la entidad Products
        const product = new Products();
        product.name = elem.name;
        product.price = elem.price;
        product.stock = elem.stock;
        product.imgUrl = elem.imgUrl;
        product.description = elem.description;
        product.categories = category;

        // Guardo el producto en la tabla products que está relacionada con dicha entidad,
        // actualizo los datos si el producto ya existe guiándome por el name,
        // y si no, creo una nueva entrada en la tabla
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'Products inserted';
  }

  async updateProductDb(id: string, newProduct: any) {
    await this.productsRepository.update(id, newProduct);
    const product = await this.productsRepository.findOneBy({ id });
    return product;
  }

  async deleteProductDb(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.productsRepository.delete(product);
    return product;
  }
}
