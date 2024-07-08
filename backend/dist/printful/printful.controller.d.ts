import { PrintfulService } from './printful.service';
export declare class PrintfulController {
    private readonly printfulService;
    constructor(printfulService: PrintfulService);
    getProducts(): Promise<any>;
}
