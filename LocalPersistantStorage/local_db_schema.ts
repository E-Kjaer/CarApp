import { SQLiteDatabase } from "expo-sqlite";
import { getDB } from "./local_db";

const db = await getDB();

export async function createTables() {
    await createUserTable();
    await createCarTable();
    await createRentsTable();
}

export async function createCarTable() {
    db.execAsync(`CREATE TABLE IF NOT EXISTS car (
    car_id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    fuel_type TEXT,
    range INTEGER,
    seats INTEGER NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL,
    owner_id INTEGER,
    FOREIGN KEY(owner_id) REFERENCES user(user_id)
  )`);
}
export async function createUserTable() {
    db.execAsync(`CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phonenumber TEXT NOT NULL,
    password TEXT NOT NULL,
    is_owner BOOLEAN DEFAULT 0,
    rating REAL
  )`);
}
export async function createRentsTable() {
    db.execAsync(`INSERT INTO rents (renter_id, car_id, start_date, end_date) VALUES
    (2, 1, '20251001', '20251005'),
    (3, 2, '20251003', '20251007'),
    (5, 3, '20251010', '20251015'),
    (2, 4, '20251012', '20251014'),
    (3, 5, '20251020', '20251025')
`);
}