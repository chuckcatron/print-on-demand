import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CustomLoggerService } from '../logger.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: Repository<Order>;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomLoggerService,
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockImplementation((order) => order),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            getProductById: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all orders', async () => {
    const orders = await service.getAllOrders();
    expect(orders).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return an order by id', async () => {
    const order = await service.getOrderById(1);
    expect(order).toEqual({});
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['product'],
    });
  });

  it('should create an order', async () => {
    const orderData = {
      product: { id: 1 },
      quantity: 2,
      totalPrice: 100,
    } as Partial<Order>;
    const order = await service.createOrder(orderData);
    expect(order).toEqual({});
    expect(productsService.getProductById).toHaveBeenCalledWith(1);
    expect(repository.save).toHaveBeenCalledWith({
      ...orderData,
      product: {},
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should update an order', async () => {
    const orderData = {
      product: { id: 1 },
      quantity: 2,
      totalPrice: 100,
    } as Partial<Order>;
    const order = await service.updateOrder(1, orderData);
    expect(order).toEqual({});
    expect(repository.update).toHaveBeenCalledWith(1, {
      ...orderData,
      updatedAt: expect.any(Date),
    });
  });

  it('should delete an order', async () => {
    await service.deleteOrder(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
