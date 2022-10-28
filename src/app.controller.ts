import { Controller, Get, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import ormConfig from '@/config/orm.config'

@Controller()
export class AppController {
	constructor(
		@Inject(ormConfig.KEY)
		private readonly dataBase: ConfigType<typeof ormConfig>
	) {}

	@Get()
	getHello(): any {
		return '去你妈的'
	}
}
