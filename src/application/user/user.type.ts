import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../domain/user.domain";
import { Match } from "../../utils/match.decorator";
import { PaginationResponse } from "../../utils/pagination";
import { IsString, IsNotEmpty, IsOptional, MinLength, IsAlphanumeric } from 'class-validator'

@ObjectType()
export class UserResponse extends PaginationResponse {

  @Field(type => [User])
  data: User[]

}

@ArgsType()
export class CreateUserArgs {
  @Field(type => String)
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Field(type => String)
  @IsAlphanumeric()
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @Field(type => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @Field(type => String)
  @IsString()
  @IsOptional()
  role: string;

  @Field(type => String)
  @Match('password')
  confirmPassword: string;
}
