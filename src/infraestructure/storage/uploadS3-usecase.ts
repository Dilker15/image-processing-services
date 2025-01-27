import { IStorage } from "../../domain/interfaces/IStorage";
import { s3_client } from "../conf/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {v4 as uuid} from 'uuid'



export class AwsStrategy implements IStorage{

    
    constructor(){

    }



    async upload(path:Buffer): Promise<{ secureUrl: string; publicId: string }> {
      const key = uuid();
      const contentType = "image/jpg"
     
      try {
        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
          Body: path,
          ContentType: contentType, 
        });
        await s3_client.send(command);
        const secureUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        return { secureUrl, publicId: key };
    
      } catch (error) {
        console.error("Error al subir archivo a S3:", error);
        throw new Error("No se pudo subir el archivo a S3.");
      }
    }



}