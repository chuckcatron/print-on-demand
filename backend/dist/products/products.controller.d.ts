import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
}
