export function canFitPackages(packages,capacity)
{
    function bt(i,remain)
    {
        if(remain<0)
            return false;
        if(i===packages.length)
                return true;
        if(bt(i+1,remain-packages[i].size))
            return true;

        return bt(i+1,remain);
    }
    return bt(0,capacity);
}