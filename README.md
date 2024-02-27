# Analytics-backend
Backend Task - Node.js Express API with MySQL Database
This repository contains a Node.js Express API with MySQL database integration. The API provides endpoints to interact with product transactions, fetch statistics, and generate charts based on data from a third-party API.

Setup Instructions
Clone the repository: ```git@github.com:gurjashandeepsingh/Analytics-backend.git```

git clone git@github.com:gurjashandeepsingh/Analytics-backend.git

```USAGE```

Install dependencies:
  
  ```npm install```
Set up the MySQL database:



Start the server:


```npm run start```

The server will start running on port 3000 by default. You can also specify a custom port using the PORT environment variable.

Make sure you have MySQL installed on your machine.
The Database will connect itself with a self called function and all the credentials mentioned already.

API Endpoints

1. Initialize Database

```Endpoint: GET /services/initialize-database```

Description: Initializes the database with seed data fetched from a third-party API.
Response:
Success: Status 200 OK with message "Database initialized with seed data".
Error: Status 500 Internal Server Error with error message.

2. List All Transactions

```Endpoint: GET /services/transactions```
Description: Lists all product transactions with support for pagination and search.
Query Parameters:
page: Page number (default: 1)
perPage: Number of items per page (default: 10)
search: Search text
Response: Array of product transactions matching the search criteria.

3. Statistics

```Endpoint: GET /services/statistics```

Description: Provides statistics for the selected month.
Query Parameters:
month: Month (1 to 12)
Response: JSON object containing total sale amount, total number of sold items, and total number of not sold items for the selected month.

4. Bar Chart

```Endpoint: GET /services/bar-chart```

Description: Generates a bar chart with price ranges and the number of items in each range for the selected month.
Query Parameters:
month: Month (1 to 12)
Response: Array of objects containing price range and count of items in that range.

5. Pie Chart
```Endpoint: GET /services/pie-chart```

Description: Generates a pie chart with unique categories and the number of items in each category for the selected month.
Query Parameters:
month: Month (1 to 12)
Response: Array of objects containing category and count of items in that category.

6. Combined Data

```Endpoint: GET /services/combined-data```

Description: Fetches data from all the above endpoints, combines the responses, and sends a final response.
Query Parameters:
month: Month (1 to 12)
Response: JSON object containing transactions, statistics, bar chart data, and pie chart data.


License
This project is licensed under the MIT License - see the LICENSE file for details.

