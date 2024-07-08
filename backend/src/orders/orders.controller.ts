import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../authorization/jwt-auth.guard';
import { CustomLoggerService } from '../logger.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly loggerService: CustomLoggerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrderById(@Param('id') id: number) {
    return this.ordersService.getOrderById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() orderData: Partial<Order>, @Request() req) {
    this.loggerService.log(
      `Creating order for product ${orderData.product.id ?? 123} by user ${req.user.userId}`,
    );
    try {
      return this.ordersService.createOrder({
        ...orderData,
        userId: req.user.userId,
      });
    } catch (error) {
      this.loggerService.error(error, 'createOrder');
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() orderData: Partial<Order>) {
    return this.ordersService.updateOrder(id, orderData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.ordersService.deleteOrder(id);
  }
}
