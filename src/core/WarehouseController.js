import { ConveyorQueue } from "../structures/ConveyorQueue.js";
import  {LoadingStack } from "../structures/LoadingStack.js";
import { connectDB } from "../db/connection.js";
export class WarehouseController{
    constructor()
    {
        if(WarehouseController.instance)
            return WarehouseController.instance;
        this.inventory=[];
        this.conveyorQueue=new ConveyorQueue();
        this.loadingStack=new LoadingStack();
         this.dbReady = connectDB().then(db => {
            this.db = db;
            return db;
        });
        WarehouseController.instance=this;
}
static getInstance()
{
    return new WarehouseController();
}
}