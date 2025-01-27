
export class ImageDto {

    filters: number;
    quality: number;
    format: string;
    size_width: number;
    size_height: number;
    rotate: number;
    strategy: number;
    watermark: boolean;

    
    constructor(filters:number,quality:number,format:string,size_width:number,size_height:number,rotate:number,strategy:number,mark:boolean) {
        this.filters = filters;
        this.quality = quality;
        this.format = format;
        this.size_width = size_width;
        this.size_height = size_height;
        this.rotate = rotate;
        this.strategy =strategy;
        this.watermark = mark;
    }


    static createDto(data:{[key:string]:any}):ImageDto{
        return new ImageDto(data.filters,data.quality,data.format,data.size_width,data.size_height,data.rotate,data.strategy,data.watermark);
    }







}