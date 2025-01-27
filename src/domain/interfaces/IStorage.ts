import { ImageDto } from "../dtos/ImageDto";



export interface IStorage{

     upload(path:Buffer):Promise<{ secureUrl: string; publicId: string }>;
     
}