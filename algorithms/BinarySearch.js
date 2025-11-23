export function BestFitBin(bins,packageSize)
{
    let l=0,r=bins.length-1;
    let answer=null;
    while(l<=r)
    {
        const mid=Math.floor((l+r)/2);

        if(bins[mid].capacity>=packageSize)
        {
            answer=bins[mid];
            r=mid-1;
        }
        else{
            l=mid+1;
        }
    }
    return answer;
}