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

const packages=[
    new Package("001",25,"VSKP"),
    new Package("002",12,"BZA"),
    new Package("003",7,"HYD")
];

async function main(packages,index=0) {
   if(index>=packages.length)
        return;
    const pkg=packages[index];
    const bin=BestFitBin(master.inventory,pkg.size);

     while (!master.db) 
     await new Promise(r => setTimeout(r, 50));

    await master.db.exec(`CREATE TABLE IF NOT EXISTS shipment_logs(
    tracking_id TEXT NOT NULL,
    bin_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL
)
`);
  if (bin) {
        console.log("Best Fit Bin for", pkg.tracking_id, ":", bin);
        await writeLog(await master.db, pkg.tracking_id, bin.bin_id, "BIN ASSIGNED");
    } else {
        console.log("No bin fits package", pkg.tracking_id);
        await writeLog(await master.db, pkg.tracking_id, null, "BIN_NOT_ASSIGNED");
    }

    
master.conveyorQueue.enqueue(pkg);
console.log("Remove from container:",master.conveyorQueue.dequeue());

master.loadingStack.push(pkg);
master.loadingStack.rollback_load(1);

await main(packages,index+1);
}

const fragile=[
    {size:5},
    {size:7},
    {size:3}
];

console.log("Can the fragile items be fitted?",canFitPackages(fragile,10));
main(packages);
