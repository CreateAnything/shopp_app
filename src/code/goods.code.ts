import { ErrCode } from './type'
interface ErrCodeType<T> {
	NotFound: T
}
export const GoodsErrCode: ErrCodeType<ErrCode> = {
	NotFound: {
		message: '未查询到该商品',
		code: 80001
	}
}
