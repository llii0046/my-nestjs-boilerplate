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

@Controller('products')
export class ProductController {
  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateProductDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all products';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} product`;
  }
}
