import { ErrCode } from './type'
interface ErrCodeType<T> {
	Auth_HasUser: T
}
export const AuthErrCode: ErrCodeType<ErrCode> = {
	Auth_HasUser: {
		message: '该用户已经注册',
		code: 10001,
	},
}
