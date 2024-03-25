import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';
import Product from '@/entities/product.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Products')
@Controller('product')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Add a product, need admin permission' })
  @ApiOkResponse({ type: Product })
  @Post()
  @HttpCode(201)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'List all products' })
  @ApiOkResponse({ type: [Product] })
  @Get('all')
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Find Product By id' })
  @ApiOkResponse({ type: Product })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findProductById(id);
  }
}
