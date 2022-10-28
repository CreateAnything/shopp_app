import { Controller, Get } from '@nestjs/common'

@Controller('category')
export class CategoryController {
	@Get()
	getCategory() {
		return '你好啊'
	}
}
