import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/role.enum';
export const Roles_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(Roles_KEY, roles);
