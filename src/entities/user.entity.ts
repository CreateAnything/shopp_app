import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Address } from './address.entity'
import { Cart } from './cart.entity'
@Entity('user')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	userid: string

	@Column({ type: 'varchar', nullable: false, comment: '用户账号' })
	username: string

	@Column({ type: 'varchar', nullable: false, comment: '用户密码' })
	password: string

	@Column({ type: 'varchar', comment: '用户头像', nullable: true })
	avatar: string

	@Column({ type: 'varchar', length: 20, nullable: true, comment: '用户电话' })
	phone: string

	@Column({
		type: 'varchar',
		length: 100,
		nullable: true,
		comment: '重置密码的问题',
	})
	question: string

	@Column({
		type: 'varchar',
		length: 100,
		nullable: true,
		comment: '重置密码的答案',
	})
	answer: string

	@OneToMany(type => Cart, cart => cart.user) //一对多一个用户可以有多个购物车商品
	carts: Cart[]

	@OneToMany(type => Address, address => address.user)
	address: Address[]

	@CreateDateColumn({ comment: '创建时间' }) //自动生成
	createdAt: string

	@UpdateDateColumn({ comment: '更新时间' }) //自动生成
	uodatedAt: string
}
