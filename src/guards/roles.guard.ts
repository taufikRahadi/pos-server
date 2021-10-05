import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Token } from "../application/auth/auth.type";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())

    if (!roles) return true

    const request = context.switchToHttp().getRequest()
    const user: Token = request.userinfo

    return this.matchRoles(roles, user.role)
  }

  matchRoles(roles: string[], userRole: string): boolean {
    return roles.some(role => role === userRole)
  }
}
