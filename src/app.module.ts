import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SessionController } from './presentation/controllers/session';
import { SessionService } from './application/services/session';
import { GitHubOAuthAccessor } from './infrastructure/externals/GitHubOAuthAccessor';

const config = ConfigModule.forRoot({
  envFilePath: ['.env.local'],
});

import { ormoptions } from './ormconfig';
const db = TypeOrmModule.forRoot(ormoptions);

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    {
      provide: 'GitHubOAuthRepository',
      useClass: GitHubOAuthAccessor,
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
