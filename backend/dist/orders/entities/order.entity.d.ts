import { Product } from '../../products/entities/product.entity';
export declare class Order {
    id: number;
    userId: string;
    totalPrice: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    product: Product;
    quantity: number;
}
