import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { ExtractionLogsModule } from './extraction-logs/extraction-logs.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { PhotoController } from './photo/photo.controller';
import { PhotoService } from './photo/photo.service';
import { PhotoModule } from './photo/photo.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [
        "dist/**/*.entity{.ts,.js}"
      ],
      synchronize: process.env.ENV === 'dev',
      logging: true,
      autoLoadEntities: true,
    }),
    ExtractionLogsModule,
    AuthModule,
    PhotoModule,
  ],
  controllers: [AppController, PhotoController],
  providers: [AppService, PhotoService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
