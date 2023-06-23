import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { TaksModule } from './taks/taks.module';

@Module({
  imports: [TeamsModule, TaksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
