import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../../domain/order.domain";
import { AuthModule } from "../auth/auth.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ Order ])
  ],
  controllers: [
    OrderController
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule {}
