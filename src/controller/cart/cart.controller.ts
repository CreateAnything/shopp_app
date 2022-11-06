import { Auth } from '@/decorator/auth.decorator'
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('cart')
@ApiTags('cart')
@Auth()
export class CartController {}
