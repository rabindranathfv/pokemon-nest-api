import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { loadConfig } from './config/env.config';
import { validationSchema } from './config/env-schema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
      validationSchema,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        /* istanbul ignore next */
        const node_env = configService.get('NODE_ENV');
        const dbHost = configService.get('DB_HOST');
        const mongoConfig = configService.get('MONGO_URL');
        console.log(
          '🚀 ~ file: app.module.ts:28 ~ mongoConfig:',
          node_env,
          dbHost,
          mongoConfig,
        );
        /* istanbul ignore next */
        return { uri: mongoConfig };
      },
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
