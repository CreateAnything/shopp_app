import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orderitem')
export class OrderItem extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({comment:'订单编号'})
    orderid:string

    @Column({comment:'用户编号'})
    userid:string

    @Column({comment:'产品编号'})
    goodsid:string

    @Column({comment:'产品名称'})
    proname:string

    @Column({comment:'产品图片地址'})
    proimage:string

    @Column({type:'decimal',comment:'单价'})
    currentunitprice:number

    @Column({comment:'产品数量'})
    quantity:number

    @Column({comment:'产品总价'})
    totalprice:number

    @CreateDateColumn({comment:'创建时间'})//自动生成
    createdAt:string

    @UpdateDateColumn({comment:'更新时间'})//自动生成
    uodatedAt:string
    
}