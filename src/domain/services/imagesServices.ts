import sharp, { OutputInfo } from "sharp";
import { ImageDto } from "../dtos/ImageDto";


export class ImageServices{


    static async processImage(path:string,options:ImageDto):Promise<Buffer>{
        try {
          const metadate = await sharp(path).metadata();
         let imageProcessed = sharp(path)
                                    .resize(+options.size_width||metadate.width,+options.size_height||metadate.height)
                                    .rotate(+options.rotate)
                                    

          if (options.filters == 1) {
             imageProcessed = imageProcessed.grayscale();
          } else {
              imageProcessed = imageProcessed.modulate({
              saturation: 0.4, 
              hue: 30 
              });
          }
              
              switch (options.format) {
                case 'jpeg':
                  imageProcessed = imageProcessed.toFormat(options.format);
                  imageProcessed =  imageProcessed.jpeg({ quality: +options.quality });
                    break;
                case 'png':
                  imageProcessed = imageProcessed.toFormat(options.format);
                  imageProcessed =  imageProcessed.png({ quality: +options.quality });
                    break;
                default:
                   console.log("Something was wrong");
            }

            const bufferImage = await imageProcessed.toBuffer();
            return bufferImage;
          } catch (error) {
            console.error('Error al procesar la imagen:', error);
            throw error;
          }
      
      
    }
}