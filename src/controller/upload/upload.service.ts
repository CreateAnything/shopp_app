import { Inject, Injectable } from '@nestjs/common'
import UploadConfig from '@/config/upload.config'
import { ConfigType } from '@nestjs/config'
@Injectable()
export class UploadService {
	constructor(
		@Inject(UploadConfig.KEY)
		private uploadConfig: ConfigType<typeof UploadConfig>
	) {}
	getFilePath(file: Express.Multer.File): Express.Multer.File {
		const type = file.mimetype.split('/')[0]
		file.path = `${this.uploadConfig.fileRoot}/${type}/${file.filename}`
		return file
	}

	getFilesPath(files: Express.Multer.File[]): Express.Multer.File[] {
		files.map(item => {
			item = this.getFilePath(item)
			return item
		})
		return files
	}
}
