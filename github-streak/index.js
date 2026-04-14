
// http://localhost:3000/api/streak?user=github-username

import express from "express";
import dotenv from "dotenv";
import handler from "./api/streak.js";
import report from "./api/report.js";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.get("/api/streak", handler);
app.get("/api/report", report);

app.get("/", (req, res) => {
  res.send("Server running ");
});

app.listen(port, () => {
  console.log("Port = 3000");
});
