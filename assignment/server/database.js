import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";

const DB_FILE = "./server/database.sqlite";

if (fs.existsSync(DB_FILE)) {
  fs.unlinkSync(DB_FILE);
}

const dbPromise = open({
  filename: DB_FILE,
  driver: sqlite3.Database,
});

export default dbPromise;
