import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    const uploadedImage = await this.fileUploadRepository.uploadedImage(file);
    return [
      'Product updated',
      await this.productsRepository.update(productId, {
        imgUrl: uploadedImage.secure_url,
      }),
    ];
  }
}
