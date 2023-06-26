import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './configuration';

export const ConfigProvider: DynamicModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
});
