import { registerAs } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
export default registerAs<TypeOrmModuleOptions>('dataBase', () => ({
	type: 'mysql',
	host: process.env.HOST,
	port: parseInt(process.env.PORT),
	username: process.env.USER_NAME,
	password: process.env.PASS_WORD,
	database: process.env.DATA_BASE,
	synchronize: true,
	entities: [__dirname + '/../**/*.entity.js']
}))
