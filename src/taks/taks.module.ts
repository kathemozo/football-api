import { Module } from '@nestjs/common';
import { TaksService } from './taks.service';

@Module({
  providers: [TaksService]
})
export class TaksModule {}
