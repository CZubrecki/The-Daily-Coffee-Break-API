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

        const imageBuffer = Buffer.from(data.base64, "base64");

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
