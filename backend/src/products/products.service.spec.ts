import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.getAllProducts();
    expect(products).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a product by id', async () => {
    const product = await service.getProductById(1);
    expect(product).toEqual({});
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a product', async () => {
    const product = await service.createProduct({
      name: 'Test',
      description: 'Test',
      price: 10,
      imageUrl: 'test.jpg',
    } as Product);
    expect(product).toEqual({});
    expect(repository.save).toHaveBeenCalledWith({
      name: 'Test',
      description: 'Test',
      price: 10,
      imageUrl: 'test.jpg',
    });
  });

  it('should update a product', async () => {
    const product = await service.updateProduct(1, {
      name: 'Test',
      description: 'Test',
      price: 10,
      imageUrl: 'test.jpg',
    } as Product);
    expect(product).toEqual({});
    expect(repository.update).toHaveBeenCalledWith(1, {
      name: 'Test',
      description: 'Test',
      price: 10,
      imageUrl: 'test.jpg',
    });
  });

  it('should delete a product', async () => {
    await service.deleteProduct(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
