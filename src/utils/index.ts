import { CategoryTreeDto } from '@/controller/category/dto/response.dto'
import * as fs from 'fs'
import { TreeConfig } from './type'
const bcrypt = require('bcryptjs')
export const Encrypt = (value: string): string => {
	const salt = bcrypt.genSaltSync(10)
	return bcrypt.hashSync(value, salt)
}
export const CompareHash = (value: string, hash: string): boolean => {
	return bcrypt.compareSync(value, hash)
}

export const checkDirAndCreate = (filePath: string) => {
	const pathArr = filePath.split('/')
	let checkPath = '.'
	let item: string
	for (item of pathArr) {
		checkPath += `/${item}`
		if (!fs.existsSync(checkPath)) {
			fs.mkdirSync(checkPath)
		}
	}
}

export const orderByTree = (config: TreeConfig): any[] => {
	const { data, parentKey, idKey, sortKey } = config
	const tree: CategoryTreeDto[] = []
	const treeMap = data.reduce((pre, next) => {
		next.children = []
		pre[next[idKey]] = next
		return pre
	}, {})
	for (let i = 0; i < data.length; i++) {
		let menu = treeMap[data[i][parentKey]]
		if (menu) {
			menu.children.push(data[i])
			menu.children = menu.children.sort((a, b) => a[sortKey] - b[sortKey])
		} else {
			tree.push(data[i])
		}
	}
	return tree.sort((a, b) => a[sortKey] - b[sortKey])
}
