import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { JwtModule } from '@nestjs/jwt';
const db = TypeOrmModule.forRoot(ormoptions);

@Module({
  imports: [
    config,
    HttpModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [config],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '120s',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
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
