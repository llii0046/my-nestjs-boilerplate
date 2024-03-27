import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty, isEqual } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { ROLE_KEY_METADATE } from '../contants/decorator.contants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLE_KEY_METADATE,
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
      request.user = this.jwtService.verify(token);
    } catch (e) {
      // Unable to pass token verification
      throw new UnauthorizedException('token is unacceptable');
    }
    if (isEmpty(request.user)) {
      throw new UnauthorizedException('token is empty');
    }
    if (!requiredRoles.includes(request.user.role)) {
      throw new UnauthorizedException('no permission');
    }
    return true;
  }
}
