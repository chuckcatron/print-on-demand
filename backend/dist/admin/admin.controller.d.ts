import { PrintfulService } from 'src/printful/printful.service';
import { ProductsService } from 'src/products/products.service';
export declare class AdminController {
    private readonly productsService;
    private readonly printfulService;
    constructor(productsService: ProductsService, printfulService: PrintfulService);
    importProducts(): Promise<import("../products/entities/product.entity").Product[]>;
    test(): Promise<string>;
}
