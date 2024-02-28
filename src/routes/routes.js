import express from "express";
import { validationResult, body, query } from "express-validator";
const router = express.Router();
import { Services } from "../services/services.js";

// This code defines a route to initialize the database by calling a method to seed the database with data.
router.get("/initialize-database", async (req, res) => {
  try {
    const seedDataInstance = await new Services();
    const result = await seedDataInstance.seedDatabase();
    res.status(200).send(`Database seeded`);
  } catch (error) {
    res.status(400).send(`Error while seeding Database`);
  }
});

// This is a JavaScript code for handling transactions route with validation of query parameters like page, perPage, and search.
const transactionValidation = [
  query("page").notEmpty().withMessage("Page number not defined"),
  query("perPage").notEmpty().withMessage("Per page is not defined"),
  query("search").optional(),
];
router.get(
  "/transactions",
  transactionValidation,
  async (request, response) => {
    try {
      const { page, perPage, search } = request.query;
      const transactionInstance = await new Services();
      const result = await transactionInstance.allTransactions(
        page,
        perPage,
        search
      );
      console.log(result);
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  }
);

// This code defines a route "/statistics" that accepts a query parameter "month" and validates it using the statisticsValidation middleware. It then calls a service method to fetch statistics data for the specified month and returns the result.
const statisticsValidation = [
  query("month").notEmpty().withMessage("Month not mentioned"),
];
router.get("/statistics", statisticsValidation, async (request, response) => {
  try {
    const { month } = request.query;
    const statisticsInstance = await new Services();
    const result = await statisticsInstance.showStatistics(month);
    return response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

// JavaScript code for handling a GET request to generate a bar chart based on the provided month
const barChartValidation = [
  query("month").notEmpty().withMessage("Please provide month"),
];
router.get("/bar-chart", barChartValidation, async (request, response) => {
  try {
    const { month } = request.query;
    const barChartInstance = await new Services();
    const result = await barChartInstance.barChart(month);
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

// This code defines a route for fetching data for a pie chart based on the provided month parameter. It validates the presence of the month parameter in the query string and then calls the pieChart method from a Services instance to retrieve the data.
const pieChartValidation = [
  query("month").notEmpty().withMessage("Please provide month"),
];
router.get("/pie-chart", pieChartValidation, async (request, response) => {
  try {
    const { month } = request.query;
    const pieChartInstance = await new Services();
    const result = await pieChartInstance.pieChart(month);
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

// This code defines a route "/combined-data" with query parameter validations for month, page, and perPage. It then calls a service method to fetch combined data based on the provided query parameters.
const combinedValidation = [
  query("month").notEmpty().withMessage("Please provide Month"),
  query("page").notEmpty().withMessage("Page number not defined"),
  query("perPage").notEmpty().withMessage("Per page is not defined"),
];
router.get("/combined-data", combinedValidation, async (request, response) => {
  try {
    const { month, page, perPage } = request.query;
    const combinedInstance = await new Services();
    const result = await combinedInstance.combined(month, page, perPage);
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error);
  }
});

export { router as servicesRouter };
