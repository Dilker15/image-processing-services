import { Router } from "express";
import { UploadRoutes } from "./routes/uploads.routes";







export class AppRoutes{


    static startRoutes():Router{
        const router = Router();
        router.use('/api/uploads',UploadRoutes.startUploadRoutes());


        return router;
    }
}