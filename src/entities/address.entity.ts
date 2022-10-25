import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('adress')
export class Address extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    addressid:string
}