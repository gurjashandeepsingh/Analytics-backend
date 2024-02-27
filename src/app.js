import express from "express";
import axios from "axios";
import mysql from "mysql";
import { servicesRouter } from "./routes/routes.js";
const app = express();
export const port = 3000;

// Database connection
/**
 * This code snippet creates a connection to a MySQL database using the `mysql` module.
 * @const {Object} db - The database connection object.
 * @property {string} host - The hostname of the database server. In this case, it's "localhost".
 * @property {string} user - The username used to authenticate with the database. In this case, it's "admin01".
 * @property {string} password - The password used to authenticate with the database. In this case, it's "qqQQ11!!".
 * @property {string} database - The name of the database to connect to. In this case, it's "products".
 */
const db = mysql.createConnection({
  host: "localhost",
  user: "admin01",
  password: "qqQQ11!!",
  database: "products",
});

// Connect to database
const dbConnection = db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL database connected");
});

app.use("/services", servicesRouter);

// API to list all transactions with search and pagination support

// API for statistics

// API for bar chart

// API for pie chart

// Combined API

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { db };
