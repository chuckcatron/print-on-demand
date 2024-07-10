import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CustomLoggerService } from '../logger.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrintfulService } from '../printful/printful.service';
export declare class ProductsService {
    private productsRepository;
    private readonly printfulService;
    private readonly loggerService;
    constructor(productsRepository: Repository<Product>, printfulService: PrintfulService, loggerService: CustomLoggerService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
    importProducts(): Promise<Product[]>;
}
