import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "../domain/order-detail.domain";
import { Order } from "../domain/order.domain";
import { Payment } from "../domain/payment.domain";
import { Inventory } from "../domain/inventory.domain";
import { User } from "../domain/user.domain";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (env: ConfigService) => ({
        type: 'postgres',
        host: env.get<string>('TYPEORM_HOST'),
        port: env.get<number>('TYPEORM_PORT'),
        database: env.get<string>('TYPEORM_DATABASE'),
        username: env.get<string>('TYPEORM_USERNAME'),
        password: env.get<string>('TYPEORM_PASSWORD'),
        synchronize: env.get<boolean>('TYPEORM_SYNCHRONIZE'),
        entities: [
          User, Inventory, Order, OrderDetail, Payment
        ],
        logging: ['query'],
      })
    })
  ],
  providers: []
})
export class DatabaseConfig {}
