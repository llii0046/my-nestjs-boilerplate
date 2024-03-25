import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImageCaptchaDto, LoginInfoDto } from './login.dto';
import { ImageCaptcha, LoginToken } from './login.class';
import { LoginService } from './login.service';

@ApiTags('Login Module')
@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @ApiOperation({
    summary: 'Get login image verification code',
  })
  @ApiOkResponse({ type: ImageCaptcha })
  @Get('captcha/img')
  async captchaByImg(@Query() dto: ImageCaptchaDto): Promise<ImageCaptcha> {
    return await this.loginService.createImageCaptcha(dto);
  }

  @ApiOperation({
    summary: 'Admin login',
  })
  @ApiOkResponse({ type: LoginToken })
  @Post('login')
  async login(
    @Body() dto: LoginInfoDto,
    @Headers('user-agent') ua: string,
  ): Promise<LoginToken> {
    await this.loginService.checkImgCaptcha(dto.captchaId, dto.verifyCode);
    const token = await this.loginService.getLoginSign(
      dto.username,
      dto.password,
      ua,
    );
    return { token };
  }
}
