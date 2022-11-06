import { Exclude } from 'class-transformer'
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Goods } from './goods.entity'
@Entity('category')
export class Category extends BaseEntity {
	@PrimaryGeneratedColumn('uuid', { comment: '类型编号' })
	cateid: string

	@Column({ comment: '父类别编号,为0表示跟节点', default: 0 })
	parentid: string

	@OneToMany(() => Goods, goods => goods.category)
	goods: Goods[]

	@Column({ comment: '分类名称' })
	name: string

	@Column({ comment: '类别状态' })
	status: boolean

	@Column({ type: 'int', comment: '类别排序' })
	sortorder: number

	@Exclude()
	@CreateDateColumn({ comment: '创建时间' }) //自动生成
	createdAt: string

	@Exclude()
	@UpdateDateColumn({ comment: '更新时间' }) //自动生成
	uodatedAt: string
}
