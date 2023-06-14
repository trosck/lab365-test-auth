import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configService.get('MONGODB_URI'), {
      dbName: configService.get('MONGODB_NAME'),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
