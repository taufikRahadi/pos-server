import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LoginArgs } from "./auth.type";

@Controller('/v1/auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('/')
  login(
    @Body() payload: LoginArgs
  ) {
    return this.authService.login(payload)
  }

  

}
