import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { Roles } from "../../utils/role.decorator";
import { User } from "../../utils/user.decorator";
import { Token } from "../auth/auth.type";
import { UserService } from "./user.service";
import { CreateUserArgs } from "./user.type";

@Controller('/v1/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  createUser(
    @Body() payload: CreateUserArgs
  ) {
    return this.userService.createUser(payload)
  }

  @Get('/')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  getAllUser() {
    return this.userService.getAllUser()
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  myProfile(@User() userinfo: Token) {
    return this.userService.getUserById(userinfo.userid)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(
    @Param('id') id: string
  ) {
    return this.userService.delete(id)
  }

}
