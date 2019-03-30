import { NestFactory } from '@nestjs/core';
import * as connectRedis from 'connect-redis';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as fs from 'fs';
import { AppModule } from './app.module';

//?? TODO: Handle environment variables in config module.
const env = dotenv.parse(fs.readFileSync('.env'));
const IN_PROD = env.NODE_ENV === 'production';

const RedisStore = connectRedis(session);
const store = new RedisStore({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  // pass: REDIS_PASSWORD
});

const options = {
  store: store,
  secret: env.SESS_SECRET,
  name: env.SESS_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: parseInt(env.SESS_LIFETIME), // 2 hours
    sameSite: true,
    secure: IN_PROD,
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session(options));
  await app.listen(3000);
}
bootstrap();
