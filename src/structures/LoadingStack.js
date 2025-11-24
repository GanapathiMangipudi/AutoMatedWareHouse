export class LoadingStack{
    constructor()
    {
        this.items=[];
    }

    push(item)
    {
        this.items.push(item);
    }

    pop()
    {
        return this.items.pop();
    }

    rollback_load(count)
    {
        while(count -->0)
        {
            console.log("Removed",this.pop());
        }
    }
}