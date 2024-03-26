import { ADMIN_USER } from '@/constants/admin';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty, isEqual } from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'] as string;
    if (isEmpty(token)) {
      throw new UnauthorizedException('token is empty');
    }
    try {
      // Mount the object to the current request
      request[ADMIN_USER] = this.jwtService.verify(token);
    } catch (e) {
      // Unable to pass token verification
      throw new UnauthorizedException('token is unacceptable');
    }
    if (isEmpty(request[ADMIN_USER])) {
      throw new UnauthorizedException('token is empty');
    }
    if (!isEqual(request[ADMIN_USER].role, ADMIN_USER)) {
      throw new UnauthorizedException('no permission');
    }
    return true;
  }
}
