import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { CustomLoggerService } from '../logger.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private productsService: ProductsService,
    private readonly loggerService: CustomLoggerService,
  ) {}

  getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['product'] });
  }

  getOrderById(id: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    this.loggerService.log(
      `Creating order for product ${orderData.product.id ?? 123}`,
    );
    const product = await this.productsService.getProductById(
      orderData.product.id,
    );
    if (!product) {
      throw new Error('Product not found');
    }
    orderData.status = 'pending';
    this.loggerService.debug(`OrderData: ${JSON.stringify(orderData)}`);
    const order = this.ordersRepository.create({
      ...orderData,
      product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.ordersRepository.save(order);
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
    await this.ordersRepository.update(id, {
      ...orderData,
      updatedAt: new Date(),
    });
    return this.ordersRepository.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  deleteOrder(id: number): Promise<void> {
    return this.ordersRepository.delete(id).then(() => undefined);
  }
}
