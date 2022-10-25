import * as dotenv from 'dotenv';
const EnvConfig = dotenv.config().parsed;
export const AppConfig = {
    app_url: EnvConfig.APP_URL ?? 'http://localhost:3000',
    port: parseInt(EnvConfig.PORT) ?? 3000,
    jwt_secret: EnvConfig.JWT_SECRET ?? 'jwt_secret_key',

    // DB相关配置
    db_host: EnvConfig.DB_HOST ?? '127.0.0.1',
    db_port: parseInt(EnvConfig.DB_PORT) ?? 3306,
    db_username: EnvConfig.DB_USERNAME ?? 'root',
    db_password: EnvConfig.DB_PASSWORD ?? '123456',
    db_database: EnvConfig.DB_DATABASE ?? 'blog',
};
