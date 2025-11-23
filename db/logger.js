export async function writeLog(db,trackingId,binId,status)
{
    try{
        await db.run(
            `INSERT INTO shipment_logs(tracking_id,bin_id,status)
            VALUES (?,?,?)`,
            [trackingId,binId,status]
        );
    }
    catch(err)
    {
        console.error("Write Failed",err);
    }
}