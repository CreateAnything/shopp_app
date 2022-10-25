import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
enum Status{
    已取消 = 0,
    未付款 = 10,
    已付款 = 20,
    已发货 = 40,
    交易成功 = 50,
    交易关闭 = 60
}
@Entity('orders')
export class Order extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    orderid:string

    @Column({comment:'用户编号'})
    userid:string

    @Column({comment:'收获信息编号'})
    shoppingid:string

    @Column({type:'decimal',comment:'实付金额'})
    payment:number

    @Column({comment:'付款类型'})
    paymenttype:number

    @Column({comment:'运费'})
    postage:number

    @Column({type:'enum',enum:Status,comment:'订单状态'})
    status:Status

    @Column({type:'datetime',comment:'支付时间'})
    paymenttime:Date
    
    @Column({type:'datetime',comment:'发货时间'})
    sendtime:Date

    @Column({type:'datetime',comment:'订单完成时间'})
    endtime:Date

    @Column({type:'datetime',comment:'订单关闭时间'})
    closetime:Date  

    @CreateDateColumn({comment:'创建时间'})//自动生成
    createdAt:string

    @UpdateDateColumn({comment:'更新时间'})//自动生成
    uodatedAt:string

}