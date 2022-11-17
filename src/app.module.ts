import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SessionController } from './presentation/controllers/SessionController';
import { SessionService } from './application/services/SessionService';
import { GitHubOAuthAccessor } from './infrastructure/externals/GitHubOAuthAccessor';

const config = ConfigModule.forRoot({
  envFilePath: ['.env.local'],
});

import { ormoptions } from './ormconfig';
import { HttpModule } from '@nestjs/axios';
import { UserAccessor } from './infrastructure/datasources/UserAccessor';
import { UserEntity } from './infrastructure/datasources/entities';
const db = TypeOrmModule.forRoot(ormoptions);

@Module({
  imports: [config, HttpModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: 'GitHubOAuthRepository',
      useClass: GitHubOAuthAccessor,
    },
    {
      provide: 'UserRepository',
      useClass: UserAccessor,
    },
  ],
})
export class SessionModule {}

@Module({
  imports: [config, db, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
