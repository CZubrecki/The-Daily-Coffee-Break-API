import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js'

@Injectable()
export class PhotoService {
    constructor(
    ) { }

    public async processImage(data: any): Promise<any> {
        const worker = Tesseract.createWorker({
            logger: m => console.log(m)
        });

        const base64String = 'data:image/png;base64,' + data.base64;
        const base64string = base64String.split(',')[1];
        const imageBuffer = Buffer.from(base64string, 'base64');
        console.log(imageBuffer);

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        console.log('WE ARE HERE');
        const { data: { text } } = await worker.recognize(imageBuffer);
        console.log('--------', text);
        await worker.terminate();
        return text;
    }

}
