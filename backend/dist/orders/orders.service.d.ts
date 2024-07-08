import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { CustomLoggerService } from '../logger.service';
export declare class OrdersService {
    private ordersRepository;
    private productsService;
    private readonly loggerService;
    constructor(ordersRepository: Repository<Order>, productsService: ProductsService, loggerService: CustomLoggerService);
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    createOrder(orderData: Partial<Order>): Promise<Order>;
    updateOrder(id: number, orderData: Partial<Order>): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
}
