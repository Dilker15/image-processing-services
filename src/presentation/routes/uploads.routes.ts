import { Router,Request,Response } from "express";
import { MiddlwaresFile } from "../middlewares/MiddlewaresFiles";
import { UploadFileController } from "../controllers/UploadFile.controller";
import { SaveFile } from "../../domain/use-cases/uploadFile/SaveFile";
import { CloudinaryStragety } from "../../infraestructure/storage/uploadCloudinary-usecase";




export class UploadRoutes{


    static startUploadRoutes():Router{

        const router = Router();
        const saveFileContext = new SaveFile(new CloudinaryStragety()); // cloudinary BY DEFAULT STRATEGY
        
        const uController = new UploadFileController(saveFileContext);
        router.post('/',MiddlwaresFile.verifyFile,uController.upload);

        return router;
    }
}