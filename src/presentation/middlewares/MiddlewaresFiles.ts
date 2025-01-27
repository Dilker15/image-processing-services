import { NextFunction,Request,Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";





export class MiddlwaresFile{


    static verifyFile(req:Request,res:Response,next:NextFunction):void{
        const files = req.files
        if(!files){
            res.status(400).json({
                "message":"File not found"
            });
            return;
        }
        const upload = files.image as UploadedFile;
        req.body.pathFile = upload.tempFilePath;
    
        next();
    }
}