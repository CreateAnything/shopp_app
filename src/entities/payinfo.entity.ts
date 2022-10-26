import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('payinfo')
export class PayInfo extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    payid:string

    @Column({comment:'订单编号'})
    orderid:string

    @Column({comment:'用户编号'})
    userid:string

    @Column({comment:'支付平台'})
    payplatfrom:number

    @Column({comment:'支付流水号'})
    platformnumber:string

    @Column({comment:'支付状态'})
    platformstatus:string

    @CreateDateColumn({comment:'创建时间'})//自动生成
    createdAt:string

    @UpdateDateColumn({comment:'更新时间'})//自动生成
    uodatedAt:string

}