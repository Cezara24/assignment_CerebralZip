import express from "express";
import cors from "cors";
import dbPromise from "./database.js";
import { importData } from "./importData.js";

const app = express();
app.use(cors());
const PORT = 5000;

async function startServer() {
  try {
    await importData();

    app.get("/api/comparison", async (req, res) => {
      const db = await dbPromise;
      const data = await db.all("SELECT * FROM comparison");
      res.json(data);
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error when importing data:", error);
  }
}

startServer();
