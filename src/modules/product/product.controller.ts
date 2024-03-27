import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';
import Product from '@/entities/product.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponseData,
  ApiOkResponsePaginated,
} from '@/common/class/res.class';
import { AuthGuard } from '@/common/guards/auth.guard';
import { Roles } from '@/common/decorators/role.decorator';
import { ADMIN_USER } from '@/constants/admin';

@ApiTags('Products')
@Controller('product')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Add a product, need admin permission' })
  @ApiOkResponseData(Product)
  @Post()
  @HttpCode(201)
  @Roles(ADMIN_USER)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'List all products' })
  @ApiOkResponsePaginated(Product)
  @Get('all')
  async findAll(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @ApiOperation({ summary: 'Find Product By id' })
  @ApiOkResponseData(Product)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findProductById(id);
  }
}
