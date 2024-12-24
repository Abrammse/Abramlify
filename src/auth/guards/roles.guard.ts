import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.enum';
import { Roles_KEY } from '../decortors/roles.decorator';
import { User } from '../models/user.nterface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext, // Prefix with underscore to suppress the warning
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reqiredRoles = this.reflector.getAllAndOverride<Role[]>(Roles_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!reqiredRoles) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();

    return reqiredRoles.some((role) => user.role?.includes(role));
  }
}
