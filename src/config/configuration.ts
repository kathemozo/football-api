import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Environment } from '../common/enum/enviromet.enum';

const configuration = () => ({
  env: process.env.NODE_ENV || Environment.DEVELOPMENT,
  db: {
    uri: process.env.DB_URI || 'mongodb://root:123456@localhost:27017',
    dbName: process.env.DB_NAME || 'teams-db',
  } as MongooseModuleOptions,
});

export type configType = ReturnType<typeof configuration>;

export default configuration;
