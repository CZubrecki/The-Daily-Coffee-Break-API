import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
    providers: [PhotoService],
    controllers: [PhotoController],
    imports: [],
    exports: [],
})
export class PhotoModule { }