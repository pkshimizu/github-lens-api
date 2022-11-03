import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

const config = ConfigModule.forRoot({
  envFilePath: ['.env.local'],
});

import { ormoptions } from './ormconfig';
const db = TypeOrmModule.forRoot(ormoptions);

@Module({
  imports: [config, db],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
