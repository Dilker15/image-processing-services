import { IStorage } from "../../interfaces/IStorage";
import { Buffer } from "buffer";


export class SaveFile{


    private strategy:IStorage;


    constructor(strategy:IStorage){
        this.strategy=strategy;
    }


    setStrategy(strategy:IStorage):void{
        this.strategy=strategy;
    }


    async execute(path:Buffer):Promise<string>{
        const url = await this.strategy.upload(path)
        return url.secureUrl;
    }




}

