import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    default: 'name1',
    description: 'Product name',
  })
  @IsString()
  readonly name: string = 'name1';

  @ApiProperty({
    required: true,
    default: '123456',
    description: 'Product sku',
  })
  @IsString()
  readonly sku: string = '123456';

  @ApiProperty({
    required: true,
    default: 100,
    description: 'Product price',
  })
  @IsNumber()
  readonly price: number = 100;
}
