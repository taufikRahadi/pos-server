import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { randomString } from "../utils/random-string";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.domain";
import { OrderDetail } from "./order-detail.domain";

@Entity()
@ObjectType()
export class Inventory extends Base {
  
  @PrimaryColumn({
    type: 'varchar'
  })
  @Field(type => ID)
  id?: string;

  @Column({
    type: 'varchar',
  })
  @Field(type => String)
  name: string;

  @Column({
    type: 'int',
    unsigned: true
  })
  @Field(type => Int)
  price: number;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: {
      from: (val: string) => val,
      to: (val: string) => `http://localhost:8080/photo/inventory/${val}`
    }
  })
  @Field(type => String, { nullable: true })
  picture?: string;

  @Column({
    type: 'text',
    nullable: true
  })
  @Field(type => String, { nullable: true })
  description?: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  @Field(type => String)
  category?: string;

  @Column({
    type: 'boolean',
    default: true
  })
  @Field(type => Boolean)
  availability?: boolean

  @DeleteDateColumn()
  @Field(type => Date, { nullable: true })
  deletedAt?: Date;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
  order?: OrderDetail[];

  @BeforeInsert()
  setId?() {
    this.id = `item-${randomString(6)}`
  }

  @BeforeInsert()
  @BeforeUpdate()
  setName?() {
    this.name = this.name.toUpperCase()
  }

}
