import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('adress')
export class Address extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    addressid:string

    @ManyToOne(tyep =>User,user =>user.address)
    user:User

    @Column({comment:'订单编号'})
    orderid:string

    @Column({comment:'收货人姓名',length:20})
    name:string

    @Column({comment:'收货人电话',length:20})
    phone:string

    @Column({comment:'收货人省份',length:20})
    province:string

    @Column({comment:'收货人市',length:20})
    city:string

    @Column({comment:'收货人区/县',length:20})
    county:string

    @Column({comment:'收货人详细地址'})
    detail:string

    @CreateDateColumn({comment:'创建时间'})//自动生成
    createdAt:string

    @UpdateDateColumn({comment:'更新时间'})//自动生成
    uodatedAt:string     
}