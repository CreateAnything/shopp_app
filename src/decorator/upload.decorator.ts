import { FileErrCode } from '@/code'
import {
	applyDecorators,
	MethodNotAllowedException,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
export function UploadFilter(type: string[]) {
	return (
		_req: any,
		file: Express.Multer.File,
		callback: (error: Error | null, acceptFile: boolean) => void
	) => {
		const check: boolean = type.some(t => file.mimetype.includes(t))
		check
			? callback(null, true)
			: callback(new MethodNotAllowedException(FileErrCode.FileTypeErr), false)
	}
}

function Upload(field: string, options?: MulterOptions) {
	const myField = field || 'file'
	return applyDecorators(UseInterceptors(FileInterceptor(myField, options)))
}

export function ImageUpload(filed = 'file') {
	return Upload(filed, {
		limits: { fieldSize: Math.pow(1024, 2) * 3 },
		fileFilter: UploadFilter(['image'])
	})
}

export function UploadFile(type: string[], field: string = 'field') {
	return Upload(field, {
		fileFilter: UploadFilter(type)
	})
}
