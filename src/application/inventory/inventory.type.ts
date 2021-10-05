import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Transform } from 'class-transformer'

@ArgsType()
export class  CreateInventoryArgs {

  @Field(type => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(type => String)
  @IsString()
  @IsNotEmpty()
  category: string;

  @Field(type => Int)
  @IsNotEmpty()
  price: any;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  picture?: any;

}

@InputType()
export class UpdateInventoryArgs {

  @Field(type => String, { nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @Field(type => String, { nullable: true })
  @IsString()
  @IsOptional()
  category: string;

  @Field(type => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  price: number;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(type => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  availability?: boolean

}
