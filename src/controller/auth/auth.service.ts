import { CreateUserDto } from '@/dto/request/auth/register.dto'
import { User } from '@/entities/user.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthErrCode } from '@/code/index'
import { LoginDto } from '@/dto/request/auth/login.dto'
import { Encrypt, CompareHash } from '@/utils/index'
import { LoginDataDto } from '@/dto/response/auth/login.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private jwt: JwtService
	) {}
	public async register(dto: CreateUserDto) {
		const user = await this.userRepository.findOne({
			where: { phone: dto.phone }
		})
		if (!user) {
			dto.password = Encrypt(dto.password) //加密密码
			return await this.userRepository.save(dto)
		}
		throw new HttpException(AuthErrCode.Auth_HasUser, HttpStatus.BAD_REQUEST)
	}

	private async token({ username, userid }: Pick<User, 'username' | 'userid'>) {
		return await this.jwt.signAsync({
			username,
			userid
		})
	}

	public async login(dto: LoginDto): Promise<LoginDataDto> {
		const userRes = await this.userRepository.findOne({
			select: ['userid', 'phone', 'avatar', 'username', 'password'],
			where: { phone: dto.phone }
		})
		if (userRes) {
			const { password, ...user } = userRes
			if (!CompareHash(dto.password, password))
				throw new HttpException(AuthErrCode.PasswordErr, HttpStatus.BAD_REQUEST)
			return {
				...user,
				token: await this.token(user)
			} as unknown as LoginDataDto
		}
		throw new HttpException(AuthErrCode.UserNotExist, HttpStatus.BAD_REQUEST)
	}
}
