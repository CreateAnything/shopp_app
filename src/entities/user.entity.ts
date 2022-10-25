import { BaseEntity, Column, Entity ,PrimaryGeneratedColumn} from "typeorm";

@Entity("user")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({type:'varchar',nullable:false,comment:'用户账号'})
    username:string
    
    @Column({type:'varchar',nullable:false,comment:"用户密码"})
    password:string

    @Column({type:'varchar',nullable:true,comment:"用户头像"})
    avatar:string
}