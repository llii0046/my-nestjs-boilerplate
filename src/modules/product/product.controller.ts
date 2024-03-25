import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Param,
  Body,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';
import { Product } from '@/modules/product/product.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({summary: 'Add a product'})
  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  async create(@Body() createProductDto: CreateProductDto) {
    this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} product`;
  }
}
