import { Module } from '@nestjs/common';
import { DatabaseConfig } from '../config/database.config';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseConfig,
    UserModule,
    AuthModule,
    InventoryModule,
    OrderModule,
    PaymentModule
  ],
})
export class AppModule {}
