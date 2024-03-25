import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginToken } from './admin.class';
import { LoginService } from './login/login.service';
import { LoginInfoDto } from './login/login.dto';
import { ADMIN_PREFIX } from '@/constants/admin';

@ApiTags('Admin')
@Controller(ADMIN_PREFIX)
export class AdminsController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({
    summary: 'Admin login',
  })
  @ApiOkResponse({ type: LoginToken })
  @Post('login')
  async login(@Body() dto: LoginInfoDto, ua: string): Promise<LoginToken> {
    await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const token = await this.loginService.getLoginSign(
      dto.username,
      dto.password,
      ua,
    );
    return { token };
  }
}
