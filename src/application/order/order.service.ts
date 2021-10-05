import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../../domain/order.domain";
import { Between, Repository,  } from "typeorm";
import { CreateOrderWithDetailDto } from "./order.type";

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>) {}

  async getAllOrders(from: string, to: string) {
    try {
      const where = from && to ? {
        createdAt: Between(new Date(from), new Date(to))
      }: {}
      return await this.orderRepo.find({
        where,
        relations: ['user', 'orderDetails', 'payments']
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async setToSuccess(orderId: string) {
    try {
      const update = await this.orderRepo.update({
        id: orderId
      }, {
        status: 'success'
      })

      return update
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async createOrder(payload: CreateOrderWithDetailDto) {
    try {
      let price: number = 0
      payload.orderDetails.forEach(orderDetail => {
        price += orderDetail.price
      })

      const newOrder = await this.orderRepo.save(this.orderRepo.create({
        ...payload,
        price
      }))

      return newOrder
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findById(id: string) {
    try {
      return await this.orderRepo.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
