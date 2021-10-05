import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { IsAlphanumeric, IsString, IsNotEmpty } from 'class-validator'

@ObjectType()
export class LoginResponse {
  @Field(type => String)
  accessToken: string;

  @Field(type => String)
  refreshToken: string;
}

@ArgsType()
export class LoginArgs {
  @Field(type => String)
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @Field(type => String)
  @IsString()
  @IsNotEmpty()
  password: string
}

export interface Token {
  userid: string;
  username: string;
  role: string;
  fullname: string;
  exp: number;
  iat: number;
}
