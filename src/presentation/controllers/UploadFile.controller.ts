import { Request,Response } from "express"
import { ImageServices } from "../../domain/services/imagesServices";
import { ValidateImageData } from "../../domain/services/validateImageData";
import { ImageDto } from "../../domain/dtos/ImageDto";
import { SaveFile } from "../../domain/use-cases/uploadFile/SaveFile";
import { AwsStrategy } from "../../infraestructure/storage/uploadS3-usecase";
import { GoogleCloudStrategy } from "../../infraestructure/storage/uploadGoogle-usecase";



export class UploadFileController{

    constructor(readonly saveFile:SaveFile){

    }


    upload = async(req:Request,res:Response)=>{
        const {pathFile} = req.body;
        
        try{
            ValidateImageData.validate(req.body);
            const imageOptions = ImageDto.createDto(req.body);
            const  bufferImage= await ImageServices.processImage(pathFile,imageOptions);
            switch(+imageOptions.strategy){              // SAVE FILE STRATEGY.  BY DEFAULT THE STRATEGY IS CLOUDINARY. 
                case 2:{
                    this.saveFile.setStrategy(new AwsStrategy());
                    break;
                }
                case 3:{
                    this.saveFile.setStrategy(new GoogleCloudStrategy());   // this strategy is not implemented yet.
                    break;
                }
            }

            const secure =await  this.saveFile.execute(bufferImage);

            res.status(200).json({
                "Body":"Body from controller Files",
                "url":pathFile, 
                "file":secure
            });

        }catch(error){
            console.log(error);
            res.status(400).json(error);
        }
       
    }
}