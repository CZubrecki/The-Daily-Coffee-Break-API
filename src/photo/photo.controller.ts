import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { PhotoService } from './photo.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('photo')
export class PhotoController {

    constructor(
        private photoService: PhotoService,
    ) { }

    @Post('process')
    @UseGuards(AuthGuard())
    processImage(
        @Body() body: any
    ) {
        return this.photoService.processImage(body.file);
    }
}
