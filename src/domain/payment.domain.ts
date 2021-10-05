import { randomString } from "../utils/random-string";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Base } from "./base.domain";
import { Order } from "./order.domain";

@Entity()
export class Payment extends Base {
  @PrimaryColumn()
  id?: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  orderId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'cash'
  })
  provider?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: 'waiting'
  })
  status?: string;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true
  })
  amount: number;

  @ManyToOne(() => Order)
  order: Order;

  @BeforeInsert()
  setId() {
    this.id = `${Date.now() / 1000}-${randomString(8)}`
  }
}
