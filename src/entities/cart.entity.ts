import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('cart')
export class Cart extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    carid:string

    @ManyToOne(type =>User,user =>user.carts)
    user:User
    
    @Column({comment:'产品id'})
    goodsid:string

    @Column({type:'int',comment:'产品数量'})
    quantity:number

    @Column({comment:'是否勾选'})
    checked:boolean

    @CreateDateColumn({comment:'创建时间'})//自动生成
    createdAt:string

    @UpdateDateColumn({comment:'更新时间'})//自动生成
    uodatedAt:string     
}