import { StorageUnit } from "./StorageUnit.js";

export class StorageBin extends StorageUnit{
    constructor(bin_id,capacity,location_code)
    {
        super(capacity);
        this.bin_id=bin_id;
        this.location_code=location_code;
    }

    static compare(a,b)
    {
        return a.capacity-b.capacity;
    }
}