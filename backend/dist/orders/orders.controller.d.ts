import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CustomLoggerService } from '../logger.service';
export declare class OrdersController {
    private readonly ordersService;
    private readonly loggerService;
    constructor(ordersService: OrdersService, loggerService: CustomLoggerService);
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    createOrder(orderData: Partial<Order>, req: any): any;
    updateOrder(id: number, orderData: Partial<Order>): Promise<Order>;
    deleteOrder(id: number): Promise<void>;
}
