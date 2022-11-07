import { ErrCode } from './type'
interface ErrCodeType<T> {
	NotFound: T
	TemplateErr: T
}
export const GoodsErrCode: ErrCodeType<ErrCode> = {
	NotFound: {
		message: '未查询到该商品',
		code: 80001
	},
	TemplateErr: {
		message: '导入模板不正确',
		code: 80002
	}
}
