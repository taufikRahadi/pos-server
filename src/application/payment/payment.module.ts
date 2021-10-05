import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../../domain/order.domain";
import { Payment } from "../../domain/payment.domain";
import { AuthModule } from "../auth/auth.module";
import { MidtransModule } from "../midtrans/midtrans.module";
import { OrderService } from "../order/order.service";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment, Order
    ]),
    AuthModule,
    MidtransModule.register()
  ],
  controllers: [
    PaymentController
  ],
  providers: [
    PaymentService,
     OrderService
  ]
})
export class PaymentModule {}
