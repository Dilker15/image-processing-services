import sharp, { Metadata, OutputInfo, Sharp } from "sharp";
import { ImageDto } from "../dtos/ImageDto";

export class ImageServices {
  static async processImage(path: string, options: ImageDto): Promise<Buffer> {
    try {
      const metadata = await sharp(path).metadata();
      let imageProcessed = sharp(path)
        .resize(+options.size_width || metadata.width, +options.size_height || metadata.height)
        .rotate(+options.rotate);

      // Aplicar filtros según la opción
      if (options.filters === 1) {
        imageProcessed = imageProcessed.grayscale();
      } else {
        imageProcessed = imageProcessed.modulate({
          saturation: 0.4,
          hue: 30,
        });
      }

      // Configurar el formato de la imagen
      switch (options.format) {
        case "jpeg":
          imageProcessed = imageProcessed.toFormat(options.format);
          imageProcessed = imageProcessed.jpeg({ quality: +options.quality });
          break;
        case "png":
          imageProcessed = imageProcessed.toFormat(options.format);
          imageProcessed = imageProcessed.png({ quality: +options.quality });
          break;
        default:
          console.log("Something was wrong");
      }

      const baseImageBuffer = await imageProcessed.toBuffer();
      const {watermark} = options;
      if(watermark === true){
        const newFile = await this.addWaterMark(baseImageBuffer,metadata.width!,metadata.height!);
        return newFile;
      }

      return baseImageBuffer;
     
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      throw error;
    }
  }


  private static async addWaterMark(image: Buffer, width: number, height: number): Promise<Buffer> {
    const watermarkWidth = width * 0.5; 
    const watermarkHeight = height * 0.2; 
  
  const watermarkBuffer = await sharp({
    create: {
      width: Math.floor(watermarkWidth),
      height: Math.floor(watermarkHeight),
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="${watermarkWidth}" height="${watermarkHeight}" xmlns="http://www.w3.org/2000/svg">
            <text 
              x="50%" 
              y="50%" 
              font-size="${Math.min(watermarkWidth, watermarkHeight) / 3}" 
              fill="white" 
              opacity="0.7" 
              text-anchor="middle" 
              dominant-baseline="middle"
              font-family="Arial, sans-serif">
              DCP
            </text>
          </svg>
        `),
        gravity: "center",
      },
    ])
    .png()
    .toBuffer();

 
  const finalImage = await sharp(image)
    .composite([
      {
        input: watermarkBuffer,
        gravity: "center", 
      },
    ])
    .toBuffer();

  return finalImage;
  }
}
