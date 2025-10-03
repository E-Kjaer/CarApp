import * as database from "expo-sqlite";

const DB_NAME = "local_db";
let db: database.SQLiteDatabase | null = null;

export async function getDB() {
    if (!db) {
        db = await database.openDatabaseAsync(DB_NAME);
    }
    return db;
}