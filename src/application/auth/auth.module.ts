import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../domain/user.domain";
import { UserController } from "../user/user.controller";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    UserService, AuthService
  ],
  exports: [
    AuthService, UserService, TypeOrmModule.forFeature([ User ])
  ]
})
export class AuthModule {}
