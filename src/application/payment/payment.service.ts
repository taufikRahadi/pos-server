import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../../domain/payment.domain";
import { Repository } from "typeorm";
import { MidtransService } from "../midtrans/midtrans.service";
import { OrderService } from "../order/order.service";
import { CheckoutCashDto, CreatePaymentDto } from "./payment.type";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
    private readonly orderService: OrderService,
    private readonly midtransService: MidtransService
  ) {}

  async createPayment(payload: CreatePaymentDto) {
    try {
      const { price } = await this.orderService.findById(payload.orderId)

      const newPayment = await this.paymentRepo.save(this.paymentRepo.create({
        ...payload,
        amount: price
      }))

      return newPayment
    } catch (error) {
      throw new InternalServerErrorException(error) 
    }
  }

  async checkoutCash({ paymentId }: CheckoutCashDto) {
    try {
      const payment = await this.paymentRepo.update(paymentId, {
        status: 'success'
      })

      const findPayment = await this.paymentRepo.findOne(paymentId)

      await this.orderService.setToSuccess(findPayment.orderId)

      return payment
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async checkoutEWallet({ paymentId }) {
    try {
      const payment = await this.paymentRepo.findOne(paymentId)
      const midtransRequest = await this.midtransService.chargeEWallet({
        payment_type: 'gopay',
        transaction_details: {
          gross_amount: payment.amount,
          order_id: payment.id
        }
      })

      console.log(midtransRequest);
      

      return {
        qrCode: midtransRequest.actions.find(action => action.name === 'generate-qr-code').url,
        deeplink: midtransRequest.actions.find(action => action.name === 'deeplink-redirect').url,
        getStatus: midtransRequest.actions.find(action => action.name === 'get-status').url,
        transactionId: midtransRequest.transaction_id,
        amount: Number(midtransRequest.gross_amount)
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
