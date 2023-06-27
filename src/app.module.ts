import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { TaksModule } from './taks/taks.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { configType } from './config/configuration';
import { CompetitionsModule } from './competitions/competitions.module';
import { AssociationsModule } from './associations/associations.module';

@Module({
  imports: [
    TeamsModule,
    TaksModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dbOptions: configType['db'] = configService.get('db');
        console.log('connect to db');
        return dbOptions;
      },

      inject: [ConfigService],
    }),
    CompetitionsModule,
    AssociationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
