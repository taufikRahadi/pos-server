import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { sign } from "jsonwebtoken";
import { UserService } from "../user/user.service";
import { LoginResponse, Token } from "./auth.type";

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async login(payload: { username: string, password: string }): Promise<any> {
    try {
      const user = await this.userService.getUserByUsername(payload.username)

      if (!user) throw new BadRequestException('User not found')

      if (!this.userService.comparePassword(payload.password, user.password))
        throw new BadRequestException('Wrong password')

      const tokenPayload: Token = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60) * 12,
        fullname: user.fullName,
        iat: Math.floor(Date.now() / 1000),
        role: user.role,
        userid: user.id,
        username: user.username
      }

      const accessToken = sign(tokenPayload, this.configService.get<string>('JWT_SECRET'))

      return {
        username: user.username,
        fullname: user.fullName,
        role: user.role,
        accessToken
      }
    } catch (error) {
      throw new InternalServerErrorException(error)    
    }
  }

}
