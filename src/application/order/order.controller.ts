import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { User } from "../../utils/user.decorator";
import { Token } from "../auth/auth.type";
import { OrderService } from "./order.service";
import { CreateOrderWithDetailDto } from "./order.type";

@Controller("/v1/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
 
  @Post()
  @UseGuards(AuthGuard)
  createOrder(
    @Body() payload: CreateOrderWithDetailDto,
    @User() { userid }: Token
  ) {
    payload.createdBy = userid
    return this.orderService.createOrder(payload)
  }

  @Get()
  @UseGuards(AuthGuard)
  getAllOrders(
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.orderService.getAllOrders(from, to)
  }

}
