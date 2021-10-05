import { IsNotEmpty, IsString } from "class-validator";
import { Order } from "../../domain/order.domain";
import { IsExists } from "../../utils/is-exist.decorator";

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsExists('Order', Order, {
    message: 'Order not found.'
  })
  orderId: string;

  @IsString()
  @IsNotEmpty()
  provider: string;
}

export class CheckoutCashDto {
  @IsString()
  @IsNotEmpty()
  paymentId: string;
}

export class CheckoutEWalletDto {
  @IsString()
  @IsNotEmpty()
  paymentId: string;
}

export class GetStatus {
  @IsString()
  @IsNotEmpty()
  getStatusUrl: string;
}
