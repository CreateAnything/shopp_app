import { ErrCode } from './type'
interface ErrCodeType<T> {
	FileTypeErr: T
}
export const FileErrCode: ErrCodeType<ErrCode> = {
	FileTypeErr: {
		message: '文件类型错误',
		code: 60001
	}
}
