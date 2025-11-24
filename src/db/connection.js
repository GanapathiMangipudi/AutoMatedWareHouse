import sqlite3 from "sqlite3";
import {open} from "sqlite";
import {readFileSync} from "fs";

export async function connectDB()
{
    const db=await open({
        filename:"logistech.db",
        driver:sqlite3.Database
    });

    const schema = readFileSync(new URL("./schema.sql", import.meta.url), "utf8");
    await db.exec(schema);
    return db;
}