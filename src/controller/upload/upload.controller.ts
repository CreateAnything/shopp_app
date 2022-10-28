import { Auth } from '@/decorator/auth.decorator'
import { ImageUpload } from '@/decorator/upload.decorator'
import { FileUploadDto } from '@/dto/request/upload/upload.dto'
import { Controller, Inject, Post, UploadedFile } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import UploadConfig from '@/config/upload.config'
import { ConfigType } from '@nestjs/config'
@Controller('upload')
@ApiTags('Upload')
@Auth()
export class UploadController {
	constructor(
		@Inject(UploadConfig.KEY)
		private uploadConfig: ConfigType<typeof UploadConfig>
	) {}
	@Post('image')
	@ImageUpload()
	@ApiOperation({ summary: '图片上传' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({ description: '请选择文件', type: FileUploadDto })
	uploadImg(@UploadedFile() file: Express.Multer.File): Express.Multer.File {
		const type = file.mimetype.split('/')[0]
		file.path = `${this.uploadConfig.fileRoot}/${type}/${file.filename}`
		return file
	}
}
