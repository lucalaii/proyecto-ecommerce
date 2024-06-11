import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  createOrder(userId: string, products: any) {
    return this.ordersRepository.createOrder(userId, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
