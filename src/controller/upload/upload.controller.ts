import { Auth } from '@/decorator/auth.decorator'
import { ImageMoreUpload, ImageUpload } from '@/decorator/upload.decorator'
import { FileMoreUploadDto, FileUploadDto } from './dto/request.dto'
import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger'
import { UploadService } from './upload.service'
import { BaseResponseDto } from '@/dto/common.dto'
@Controller('upload')
@ApiTags('Upload')
@ApiOkResponse({ status: 200, type: BaseResponseDto })
@Auth()
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}
	@Post('image')
	@ImageUpload()
	@ApiOperation({ summary: '上传单张图片' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({ description: '请选择文件', type: FileUploadDto })
	uploadImg(@UploadedFile() file: Express.Multer.File): Express.Multer.File {
		return this.uploadService.getFilePath(file)
	}

	@Post('moreImage')
	@ImageMoreUpload()
	@ApiOperation({ summary: '上传多张图片' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({ description: '请选择文件', type: FileMoreUploadDto })
	async uploadMoreImage(
		@UploadedFiles() fileObj: Record<string, Express.Multer.File[]>
	) {
		return this.uploadService.getFilesPath(fileObj.file)
	}
}
