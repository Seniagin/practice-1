import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/authorization/authorization.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { initialize as initializeDatabase } from './db';

import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
  constructor(configService: ConfigService) {
    try {
      const sequelize = initializeDatabase({
        password: configService.get('DATABASE_PASSWORD'),
        username: configService.get('DATABASE_USER'),
        port: configService.get('DATABASE_PORT'),
        host: configService.get('DATABASE_HOST'),
        database: configService.get('DATABASE_NAME')
      });

      sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
          sequelize.sync({ force: true });
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
