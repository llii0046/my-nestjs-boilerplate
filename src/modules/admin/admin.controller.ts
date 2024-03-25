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
import { AdminService } from './admin.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginToken } from './admin.class';
import { LoginDto } from './dto';
import { LoginService } from './login/login.service';

@ApiTags('Admin')
@Controller('admins')
export class AdminsController {
  constructor(
    private adminService: AdminService,
    private loginService: LoginService,
  ) {}

  @ApiOperation({
    summary: 'Admin login',
  })
  @ApiOkResponse({ type: LoginToken })
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<LoginToken> {
    const token = await this.loginService.getLoginSign(
      dto.username,
      dto.password,
      dto.ua
    );
    return { token };
  }
}
