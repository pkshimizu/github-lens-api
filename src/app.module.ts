import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

const config = ConfigModule.forRoot({
  envFilePath: ['.env.local']
})

const db = TypeOrmModule.forRoot({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false
})

@Module({
  imports: [config, db],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
