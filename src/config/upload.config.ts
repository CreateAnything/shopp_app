import { registerAs } from '@nestjs/config'
export default registerAs('upload', () => ({
	fileRoot: process.env.UPLOAD_ROOT
}))
