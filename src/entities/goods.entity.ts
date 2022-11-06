import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Category } from './category.entity'
export enum StatusType {
	shelves = 1,
	unshelve = 0
}
@Entity('goods')
export class Goods extends BaseEntity {
	@PrimaryGeneratedColumn('uuid', { comment: '商品id' })
	goodsId: string

	@Column({ comment: '商品类型编号', length: 64 })
	cateid: string

	@Column({ comment: '用户id' })
	userid: string

	@ManyToOne(() => Category, category => category.goods)
	@JoinColumn({ name: 'cateid' })
	category: Category

	@Column({ length: 100, comment: '商品名称' })
	name: string

	@Column({ length: 200, comment: '商品副标题', nullable: true })
	subtitle: string

	@Column({ length: 500, comment: '商品主图' })
	mainimage: string

	@Column({ type: 'text', comment: '商品图片' })
	subimages: string

	@Column({ type: 'text', comment: '商品详情', nullable: true })
	detail: string

	@Column('decimal', { comment: '商品价格' })
	price: number

	@Column({ type: 'int', comment: '商品数量' })
	stock: number

	@Column({
		type: 'enum',
		enum: StatusType,
		default: StatusType.shelves,
		comment: '1在售0下架'
	})
	status: StatusType

	@CreateDateColumn({ comment: '创建时间' }) //自动生成
	createdAt: string

	@UpdateDateColumn({ comment: '更新时间' }) //自动生成
	uodatedAt: string
}
