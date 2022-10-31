import { ApiProperty } from '@nestjs/swagger'

export class FileUploadDto {
	@ApiProperty({ type: 'file', format: 'binary' })
	file: Express.Multer.File
}
export class FileMoreUploadDto {
	@ApiProperty({ type: ['file'], format: 'binary' })
	file: Express.Multer.File[]
}
