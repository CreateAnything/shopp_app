import { CreateUserDto } from '@/dto/auth/register.dto'
import { User } from '@/entities/user.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthErrCode } from '@/code/index'
import { LoginDto } from '@/dto/auth/login.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private jwt: JwtService,
	) {}
	async register(dto: CreateUserDto) {
		const user = await this.userRepository.findOne({
			where: { phone: dto.phone },
		})
		if (!user) return await this.userRepository.save(dto)
		throw new HttpException(AuthErrCode.Auth_HasUser, HttpStatus.BAD_REQUEST)
	}

	private async token({ username, userid }: User) {
		return {
			token: await this.jwt.signAsync({
				username,
				userid,
			}),
		}
	}

	async login({ phone, password }: LoginDto) {
		const user = await this.userRepository.findOne({ where: { phone } })
		if (user) {
			if (password !== user.password)
				throw new HttpException(AuthErrCode.PasswordErr, HttpStatus.BAD_REQUEST)
			return this.token(user)
		}
		throw new HttpException(AuthErrCode.UserNotExist, HttpStatus.BAD_REQUEST)
	}
}
