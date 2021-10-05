import { Field, ID, ObjectType } from "@nestjs/graphql";
import { genSaltSync, hashSync } from "bcrypt";
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.domain";
import { Order } from "./order.domain";

@Entity()
@ObjectType()
export class User extends Base {

  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id?: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  @Field(type => String)
  fullName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: 100
  })
  @Field(type => String)
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    select: false
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'cashier'
  })
  @Field(type => String)
  role?: string;

  @DeleteDateColumn()
  @Field(type => Date, { nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Order, order => order.user)
  orders?: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  setPassword?() {
    this.password = hashSync(this.password, genSaltSync(12))
  }

  @BeforeInsert()
  @BeforeUpdate()
  setFullName?() {
    this.fullName = this.fullName.toUpperCase()
  }

}
