import XLSX from "xlsx";
import dbPromise from "./database.js";
import fs from "fs";

const filePath = "./server/assignment_data.xlsx";

if (!fs.existsSync(filePath)) {
  console.error("error: file assignment_data.xlsx doesn't exist");
  process.exit(1);
}

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

async function importData() {
  const db = await dbPromise;
  await db.exec(`CREATE TABLE IF NOT EXISTS comparison (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month TEXT,
    this_year INTEGER,
    last_year INTEGER
  )`);

  const stmt = await db.prepare(
    "INSERT INTO comparison (month, this_year, last_year) VALUES (?, ?, ?)"
  );

  for (const row of data) {
    await stmt.run(row.Month, row["This_year"], row["Last_year"]);
  }

  await stmt.finalize();
  console.log("data imported successfully");
}

export { importData };
