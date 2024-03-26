import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Product from '@/entities/product.entity';
import { CreateProductDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { sku: createProductDto.sku },
    });
    if (existingProduct) {
      throw new BadRequestException(`SKU ${createProductDto.sku} is exsited`);
    }
    const newProduct = this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
