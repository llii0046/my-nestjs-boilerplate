import { SetMetadata } from '@nestjs/common';
import { ROLE_KEY_METADATE } from '../contants/decorator.contants';

export const Roles = (...roles: string[]) =>
  SetMetadata(ROLE_KEY_METADATE, roles);
