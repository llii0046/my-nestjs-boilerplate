import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/product/product.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
