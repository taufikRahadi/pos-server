import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { PaymentService } from "./payment.service";
import { CheckoutCashDto, CheckoutEWalletDto, CreatePaymentDto, GetStatus } from "./payment.type";

@Controller('/v1/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPayment(
    @Body() payload: CreatePaymentDto
  ) {
    return this.paymentService.createPayment(payload)
  }

  @Post('checkout-cash')
  @UseGuards(AuthGuard)
  checkoutCash(
    @Body() payload: CheckoutCashDto
  ) {
    return this.paymentService.checkoutCash(payload)
  }

  @Post('checkout-ewallet')
  @UseGuards(AuthGuard)
  checkoutEwallet(
    @Body() payload: CheckoutEWalletDto
  ) {
    return this.paymentService.checkoutEWallet(payload)
  }

  @Post('ewallet-status')
  @UseGuards(AuthGuard)
  getEwalletStatus(
    @Body() { getStatusUrl }: GetStatus
  ) {

  }
}
