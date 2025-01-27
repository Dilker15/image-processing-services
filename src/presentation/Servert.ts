import express,{Application, urlencoded} from 'express';
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { AppRoutes } from './AppRoutes';





export class Server {

    private port:number;
    private app:Application;


    constructor(){
        const po = process.env.PORT;
        if(!po){
            throw new Error('Port not Found');
        }
        this.port = parseInt(po);
        this.app=express();
        this.startMiddlwares();
        this.startRoutes();
        this.startServer();

    }



    startMiddlwares():void{
        this.app.use(express.json());
        this.app.use(urlencoded({extended:true}));
        this.app.use(cors());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }


    startRoutes():void{
        this.app.use(AppRoutes.startRoutes());
    }


    startServer():void{
        this.app.listen(this.port,()=>{
            console.log("Server running on port : ",this.port);
        })
    }







}