import { IStorage } from "../../domain/interfaces/IStorage";

import { PassThrough } from 'stream';
import cloudinary_client  from "../conf/cloudinary";




export class CloudinaryStragety implements IStorage{



    constructor(){
       
    }

    async upload(path:Buffer): Promise<{ secureUrl: string; publicId: string }> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_client.uploader.upload_stream(
                (error, result) => {
                    if (error) {
                        reject(`Error uploading image: ${error.message}`);
                    } else if (result) {
                        resolve({
                            secureUrl: result.secure_url,
                            publicId: result.public_id,
                        });
                    }
                }
            );
            const bufferStream = new PassThrough();
            bufferStream.end(path);
            bufferStream.pipe(uploadStream);
        });
    }

}