



export class ValidateImageData{
    

    static validate(data:{[key:string]:any}){
        const formats = ['png','jpeg'] 

        if(!data.size_width || data.size_width<0){
            throw Error("Width must be a positive value")
        }
        if(!data.size_height || data.size_height<0){
            throw Error("Height must be a positive value")
        }
        if(!data.rotate || data.rotate<=0){
            throw Error("Rotate must be a positive value")
        }
        if(!data.quality || data.quality<=0 || data.quality > 100){
            throw Error("Quality must be a positive value and least than 100");
        }
        if(!formats.includes(data.format)){
            throw Error("Format incorrect");
        }
        

        
    }
}