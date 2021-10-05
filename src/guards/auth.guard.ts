import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { verify } from "jsonwebtoken";
import { UserService } from "../application/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const authorizationHeader = request.headers.authorization
    if (!authorizationHeader) return false

    const [type, token] = authorizationHeader.split(' ')
    if (type !== 'Bearer' || !token) throw new UnauthorizedException('Invalid Session')

    const verifyToken = await this.validateToken(token)
      .catch(() => { throw new UnauthorizedException() })
    request['userinfo'] = verifyToken

    return true
  }

  validateToken(token: string) {
    return new Promise((resolve, reject) => {
      try {
        const verifyToken = verify(token, this.configService.get<string>('JWT_SECRET'))
        resolve(verifyToken)
      } catch (error) {
        reject(error)
      }
      
    })
  }

}