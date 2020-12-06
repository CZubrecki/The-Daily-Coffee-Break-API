import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js'

@Injectable()
export class PhotoService {
    constructor(
    ) { }

    public async processImage(data: any): Promise<void> {
        const worker = Tesseract.createWorker({});
        data = await data.parse();
        const imageBuffer = Buffer.from(data.base64, "base64");

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(imageBuffer);
        console.log('--------', text);
        await worker.terminate();
    }

}
