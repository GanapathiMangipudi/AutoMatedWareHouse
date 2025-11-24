export class StorageUnit{
    constructor(capacity)
    {
        this.capacity=capacity;
        this.used=0;
    }

    occupy_space(amount)
    {
        if(this.used+amount>this.capacity)
                return false;
        this.used+=amount;
        return true;
    }

    free_space()
    {
        this.used=0;
    }
}