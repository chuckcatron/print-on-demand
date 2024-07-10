import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CustomLoggerService } from '../logger.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly loggerService;
    constructor(productsService: ProductsService, loggerService: CustomLoggerService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
}
