import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginService } from './login/login.service';

@Module({
  providers: [ AdminService, LoginService],
  exports: [ AdminService, LoginService],
})

export class AdminModule {}
