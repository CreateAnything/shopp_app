import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { checkDirAndCreate } from '@/utils/index'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'
import { extname } from 'path'
type DestinationBack = (error: Error | null, destination: string) => void
type FileNameBack = (error: Error | null, filename: string) => void
@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory() {
				return {
					storage: diskStorage({
						destination: (
							_req: any,
							file: Express.Multer.File,
							callback: DestinationBack
						) => {
							const fileType = file.mimetype.split('/')[0]
							const path = `${process.env.UPLOAD_ROOT}/${fileType}`
							checkDirAndCreate(path)
							callback(null, path)
						}, //上传文件地址
						filename: (
							_req: any,
							file: Express.Multer.File,
							callback: FileNameBack
						) => {
							const fileName = `${
								new Date().getTime() + extname(file.originalname)
							}`
							callback(null, fileName)
						}
					})
				}
			}
		})
	],
	controllers: [UploadController],
	providers: [UploadService]
})
export class UploadModule {}
