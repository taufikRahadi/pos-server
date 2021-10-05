import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Inventory } from "../../domain/inventory.domain";
import { AuthModule } from "../auth/auth.module";
import { InventoryController } from "./inventory.controller"
import { InventoryService } from "./inventory.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Inventory
    ])
  ],
  controllers: [
    InventoryController
  ],
  providers: [
    InventoryService
  ]
})
export class InventoryModule {}
