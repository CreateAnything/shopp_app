import { PartialType } from '@nestjs/swagger'
import { BaseSuccessDto } from '@/dto/common/common.dto'

export class RegisterResponseDto extends PartialType(BaseSuccessDto) {}
