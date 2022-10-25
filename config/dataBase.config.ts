import { registerAs } from "@nestjs/config";
export default registerAs('dataBase',() =>({
    type: "mysql",
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
    database: process.env.DATA_BASE,
    synchronize: true,
    autoLoadEntities:true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'] 
}))