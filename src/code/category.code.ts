import { ErrCode } from './type'
interface ErrCodeType<T> {
	NotFound: T
}
export const CategoryErrCode: ErrCodeType<ErrCode> = {
	NotFound: {
		message: '未查询到该分类',
		code: 70001
	}
}
