import { Module } from '@nestjs/common';
import { ConfigProvider } from './config.provider';

@Module({
  imports: [ConfigProvider],
  exports: [ConfigProvider],
})
export class ConfigModule {}
