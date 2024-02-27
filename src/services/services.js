import { port } from "../app.js";
import axios from "axios";
import { request, response } from "express";
import { db } from "../app.js";

class Services {
  // Initialize the database with seed data fetched from the third-party API
  async seedDatabase() {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    // Truncate existing table
    db.query("TRUNCATE TABLE products", (err, result) => {
      if (err) throw err;
      console.log("Table truncated");
    });

    // Insert seed data into the database
    products.forEach((product) => {
      db.query(
        "INSERT INTO products (id, title, price, description, category, image, sold, dateOfSale) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          product.id,
          product.title,
          product.price,
          product.description,
          product.category,
          product.image,
          product.sold,
          product.dateOfSale,
        ],
        (err, result) => {
          if (err) throw err;
          console.log("Data inserted");
        }
      );
    });
  }

  async allTransactions(page, perPage, search) {
    // Pagination
    const offset = (page - 1) * perPage;

    // Query to fetch transactions with search and pagination
    const query = `SELECT * FROM products WHERE title LIKE '%${search}%' OR description LIKE '%${search}%' OR price LIKE '%${search}%' LIMIT ${perPage} OFFSET ${offset}`;
    const result = await queryPromise(query);
    return result;
  }

  async showStatistics(month) {
    const totalSaleQuery = `SELECT SUM(price) AS totalSaleAmount FROM products WHERE MONTH(dateOfSale) = ${month}`;
    const totalSoldItemsQuery = `SELECT COUNT(*) AS totalSoldItems FROM products WHERE MONTH(dateOfSale) = ${month} AND sold = true`;
    const totalNotSoldItemsQuery = `SELECT COUNT(*) AS totalNotSoldItems FROM products WHERE MONTH(dateOfSale) = ${month} AND sold = false`;

    try {
      // Execute all queries using async/await
      const totalSaleResult = await queryPromise(totalSaleQuery);
      const totalSoldItemsResult = await queryPromise(totalSoldItemsQuery);
      const totalNotSoldItemsResult = await queryPromise(
        totalNotSoldItemsQuery
      );

      // Construct statistics object
      const statistics = {
        totalSaleAmount: totalSaleResult[0].totalSaleAmount || 0,
        totalSoldItems: totalSoldItemsResult[0].totalSoldItems || 0,
        totalNotSoldItems: totalNotSoldItemsResult[0].totalNotSoldItems || 0,
      };
      return statistics;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      throw error;
    }
  }

  async barChart(month) {
    const priceRanges = [
      { range: "0 - 100", min: 0, max: 100 },
      { range: "101 - 200", min: 101, max: 200 },
      { range: "201 - 300", min: 201, max: 300 },
      { range: "301 - 400", min: 301, max: 400 },
      { range: "401 - 500", min: 401, max: 500 },
      { range: "501 - 600", min: 501, max: 600 },
      { range: "601 - 700", min: 601, max: 700 },
      { range: "701 - 800", min: 701, max: 800 },
      { range: "801 - 900", min: 801, max: 900 },
      { range: "901 - above", min: 901, max: Number.MAX_SAFE_INTEGER },
    ];

    const barChartData = [];
    // Execute queries for each price range using async/await
    for (const priceRange of priceRanges) {
      const query = `SELECT COUNT(*) AS count FROM products WHERE price >= ${priceRange.min} AND price <= ${priceRange.max} AND MONTH(dateOfSale) = ${month}`;
      const result = await queryPromise(query);

      const count = result[0].count || 0;
      barChartData.push({ range: priceRange.range, count });
    }

    return barChartData;
  }

  async pieChart(month) {
    const query = `SELECT category, COUNT(*) AS count FROM products WHERE MONTH(dateOfSale) = ${month} GROUP BY category`;

    try {
      const result = await queryPromise(query);
      return result;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  async combined(month, page, perPage, search) {
    const transactions = await axios.get(
      `http://localhost:${port}/services/transactions?page=${page}&perPage=${perPage}&month=${month}&search=${search}`
    );
    const statistics = await axios.get(
      `http://localhost:${port}/services/statistics?month=${month}`
    );
    const barChart = await axios.get(
      `http://localhost:${port}/services/bar-chart?month=${month}`
    );
    const pieChart = await axios.get(
      `http://localhost:${port}/services/pie-chart?month=${month}`
    );

    const combinedData = {
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    };

    return combinedData;
  }
}

function queryPromise(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export { Services };
