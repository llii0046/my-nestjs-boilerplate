import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ImageCaptchaDto {
  @ApiProperty({
    required: false,
    default: 100,
    description: 'Verification code width',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly width: number = 100;

  @ApiProperty({
    required: false,
    default: 50,
    description: 'Verification code height',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly height: number = 50;
}

export class LoginInfoDto {
  @ApiProperty({ description: 'Admin username' })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({ description: 'Admin password' })
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty({ description: 'Verification code identification' })
  @IsString()
  captchaId: string;

  @ApiProperty({ description: 'Verification code entered by the user' })
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  verifyCode: string;
}
