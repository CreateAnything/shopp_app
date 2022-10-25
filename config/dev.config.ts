import { registerAs } from "@nestjs/config";

export default registerAs('dev',() =>({
    host:process.env.APP_HOST,
    prot:process.env.APP_PORT
}))