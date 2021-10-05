import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.domain";
import { Inventory } from "./inventory.domain";
import { Order } from "./order.domain";

@Entity()
export class OrderDetail extends Base {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  orderId: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  productId: string;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true
  })
  qty: number;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true
  })
  price: number;

  @ManyToOne(() => Inventory, { eager: true })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product?: Inventory;

  @ManyToOne(() => Order)
  order?: Order;
}
