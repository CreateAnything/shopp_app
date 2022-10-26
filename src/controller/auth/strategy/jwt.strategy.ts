import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		ConfigService: ConfigService,
		@InjectRepository(User) private userRepository: Repository<User>,
	) {
		super({
			//解析用户提交到Bearer Token header的数据
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			//加密码的secret
			secretOrKey: ConfigService.get('TOKEN_SECRET'),
		})
	}
	//验证通过结果后用户的资料
	async validate({ userid }) {
		return this.userRepository.findOne({ where: { userid } })
	}
}
