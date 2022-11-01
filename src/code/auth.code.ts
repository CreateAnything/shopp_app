import { ErrCode } from './type'
interface ErrCodeType<T> {
	Auth_HasUser: T
	PasswordErr: T
	UserNotExist: T
	AuthExpired: T
	UnauthorizedToken: T
	RoleNotEnough: T
}
export const AuthErrCode: ErrCodeType<ErrCode> = {
	Auth_HasUser: {
		message: '该用户已经注册',
		code: 10001
	},
	PasswordErr: {
		message: '用户名或密码错误',
		code: 10002
	},
	UserNotExist: {
		message: '暂无该用户',
		code: 10003
	},
	AuthExpired: {
		message: 'token已失效',
		code: 10003
	},
	UnauthorizedToken: {
		message: '无效的token',
		code: 10004
	},
	RoleNotEnough: {
		message: '权限不足无法访问',
		code: 10005
	}
}
