import { BaseEntity } from '@/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'product' })
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Product id',
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'Product name',
  })
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Product sku',
  })
  sku: string;

  @Column()
  @ApiProperty({
    description: 'Product price',
  })
  price: number;
}
