// import bcrypt from 'bcryptjs'
import * as fs from 'fs'
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
