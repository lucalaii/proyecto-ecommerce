import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Orders } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { ProductDto } from './order.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private ordersDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async createOrder(userId: string, products: ProductDto[]) {
    let total: number = 0;

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) throw new NotFoundException('User not found');

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (elem) => {
        const product = await this.productsRepository.findOneBy({
          id: elem.id,
        });

        if (!product)
          throw new NotFoundException(`Product with ID ${elem.id} not found`);

        total += Number(product.price);

        await this.productsRepository.update(
          { id: elem.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.products = productsArray;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.order = newOrder;

    await this.ordersDetailsRepository.save(orderDetail);

    const orderDb = await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });

    orderDb.date = DateTime.fromJSDate(new Date(order.date))
      .setZone('America/Argentina/Buenos_Aires')
      .toFormat('yyyy-MM-dd HH:mm:ss');

    return orderDb;
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) throw new NotFoundException('Order not found');

    order.date = DateTime.fromJSDate(new Date(order.date))
      .setZone('America/Argentina/Buenos_Aires')
      .toFormat('yyyy-MM-dd HH:mm:ss');

    return order;
  }
}
