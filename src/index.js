import { WarehouseController } from "./core/WarehouseController.js";
import { StorageBin } from "./core/StorageBin.js";
import { Package } from "./core/Package.js";

import { BestFitBin } from "./algorithms/BinarySearch.js";
import { canFitPackages } from "./algorithms/backtracking.js";

import { writeLog } from "./db/logger.js";

const master=WarehouseController.getInstance();

master.inventory=[
    new StorageBin(1,5,"A1"),
    new StorageBin(2,10,"B2"),
    new StorageBin(3,15,"C2"),
    new StorageBin(4,25,"D4")
].sort(StorageBin.compare);

const pkg=new Package("001",12,"VSKP");

const bin=BestFitBin(master.inventory,pkg.size);
console.log(bin);


async function main() {
    if(bin)
    {
        while(!master.db)
        {
            await new Promise(r=>setTimeout(r,50));
        }
    

    await master.db.exec(`CREATE TABLE IF NOT EXISTS shipment_logs(
    tracking_id TEXT NOT NULL,
    bin_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL
)
`);
 writeLog(await master.db,pkg.tracking_id,bin.bin_id,"BIN ASSIGNED");   

}
master.conveyorQueue.enqueue(pkg);
console.log("Remove from contrainer",master.conveyorQueue.dequeue());

master.loadingStack.push("Box1");
master.loadingStack.push("Box2");
master.loadingStack.rollback_load(2);

const fragile=[
    {size:5},
    {size:7},
    {size:3}
];

console.log("Can the fragile items be fitted?",canFitPackages(fragile,10));
}
main();