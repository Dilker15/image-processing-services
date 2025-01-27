import { IStorage } from "../../domain/interfaces/IStorage";





export class GoogleCloudStrategy implements IStorage{


    constructor(){

    }


    upload(path:Buffer): Promise<{ secureUrl: string; publicId: string }> {
        throw new Error("Method not implemented.");
    }

}