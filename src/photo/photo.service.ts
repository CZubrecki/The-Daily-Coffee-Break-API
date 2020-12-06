import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js'

@Injectable()
export class PhotoService {
    constructor(
    ) { }

    public async processImage(data: any): Promise<any> {

        const base64String = 'data:image/png;base64,' + data.base64;
        const base64string = base64String.split(',')[1];
        const imageBuffer = Buffer.from(base64string, 'base64');
        console.log(imageBuffer);
        console.log('WE ARE HERE');
        const { data: { text } } = await Tesseract.recognize(Buffer.from(base64string, 'base64'));
        console.log('--------', text);
        return text;
    }

}
