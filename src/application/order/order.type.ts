import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateOrderWithDetailDto {
  @Type(() => OrderDetailDto)
  orderDetails: OrderDetailDto[];

  createdBy: string;
}

export class OrderDetailDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
  
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
