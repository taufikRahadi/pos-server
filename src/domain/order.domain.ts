import { randomString } from "../utils/random-string";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Base } from "./base.domain";
import { OrderDetail } from "./order-detail.domain";
import { Payment } from "./payment.domain";
import { User } from "./user.domain";

@Entity()
export class Order extends Base {
  @PrimaryColumn({
    type: 'varchar',
    length: 16
  })
  id?: string;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: false
  })
  price: number;

  @Column({
    type: 'varchar',
    default: 'waiting',
    nullable: false
  })
  status?: string;

  @Column({
    type: 'uuid',
    nullable: false
  })
  createdBy: string;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order, { cascade: ['insert'] })
  orderDetails?: OrderDetail[];

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
  user?: User;

  @OneToMany(() => Payment, payment => payment.order)
  payments?: Payment[];

  @BeforeInsert()
  setId?() {
    this.id = `order-${randomString(8)}`
  }
}
