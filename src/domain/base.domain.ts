import { Field, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class Base {

  @CreateDateColumn()
  @Field(type => Date)
  createdAt?: Date;

  @UpdateDateColumn()
  @Field(type => Date)
  updatedAt?: Date;

}
