
# Ecommerce Backend

This is a backend application for an ecommerce platform built using Node.js, Express, and TypeScript. It includes various features such as managing user authentication, cart management, order placement, and discount code handling.

## Features

- **User Authentication**: Allows users to log in using their username.
- **Cart Management**: Users can add, remove items, and view their cart.
- **Order Placement**: Users can place orders with their cart items.
- **Discount Management**: Users can apply or remove discount codes.
- **Admin Features**: Admin users can view insights and create discount codes.
- **Environmental Configuration**: Configurable environment variables for port and discount frequency.

## Tech Stack

- **Node.js**: JavaScript runtime used to run the backend.
- **Express**: Web framework for Node.js for routing and handling HTTP requests.
- **TypeScript**: Superset of JavaScript to add type safety.
- **Jest**: Testing framework for unit and integration tests.
- **dotenv**: Module to load environment variables from `.env` files.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Install Dependencies

Make sure you have **Node.js** installed on your system. Install the project dependencies using npm:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file at the root of the project and configure your environment variables:

```env
PORT=3000
NODE_ENV=development
DISCOUNT_FREQUENCY=5  # Every 5th order gets a discount
```

### 4. Running the Application

To start the server in development mode:

```bash
npm run dev
```

This will start the server at `http://localhost:3000`.

### 5. Running Tests

To run the tests for the project, use the following command:

```bash
npm run test
```

This will run all the unit tests in the project and ensure that everything is working as expected.

## Endpoints

### User Controller

- **POST** `/login`: Logs a user in using their username.
  - Request body: `{ "username": "user1" }`
  - Response: `{ "id": 2, "username": "user1" }`

### Cart Controller

- **GET** `/cart/:userId`: Retrieves the cart of a user by their ID.
  - Request params: `{ "userId": 2 }`
  - Response: `{ "userId": 2, "items": [], "total": 0, "grandTotal": 0 }`

- **POST** `/cart/add`: Adds an item to the user's cart.
  - Request body: `{ "userId": 2, "itemId": 1, "quantity": 2 }`
  - Response: `{ "userId": 2, "items": [ { "id": 1, "quantity": 2, "totalPrice": 1999.98 } ], "total": 1999.98, "grandTotal": 1999.98 }`

- **POST** `/cart/remove`: Removes an item from the user's cart.
  - Request body: `{ "userId": 2, "itemId": 1, "quantity": 1 }`
  - Response: `{ "userId": 2, "items": [], "total": 0, "grandTotal": 0 }`

### Order Controller

- **POST** `/order`: Places an order for a user.
  - Request body: `{ "userId": 2 }`
  - Response: `{ "orderId": "12345", "userId": 2, "items": [ ... ], "total": 1000, "grandTotal": 900 }`

### Discount Controller

- **POST** `/discount/apply`: Applies a discount code to a user's order.
  - Request body: `{ "userId": 2, "discountCode": "DISCOUNT10" }`
  - Response: `{ "orderId": "12345", "userId": 2, "total": 1000, "grandTotal": 900 }`

- **POST** `/discount/remove`: Removes a discount code from the user's order.
  - Request body: `{ "userId": 2, "discountCode": "DISCOUNT10" }`
  - Response: `{ "orderId": "12345", "userId": 2, "total": 1000, "grandTotal": 1000 }`

### Admin Controller

- **GET** `/admin/insights`: Retrieves insights on total orders, revenue, and more.
  - Response: `{ "totalOrders": 100, "totalRevenue": 100000, ... }`

- **POST** `/admin/discount`: Creates a new discount code.
  - Request body: `{ "percentage": 10 }`
  - Response: `{ "code": "DISCOUNT10", "percentage": 10 }`

## Folder Structure

```
/src
  /controllers      # Controllers for routing HTTP requests
  /services         # Business logic
  /models           # Data models
  /libs             # Utility functions and error handling
  config.ts         # Configuration file
/tests
  /controllers      # Test files for controllers
  /services         # Test files for services
  /libs             # Test files for libraries
  config.test.ts    # Test file for configuration
```

## Unit Testing

Unit tests are written using **Jest**. Each file in the `src` folder has corresponding test files located in the `tests` folder. The tests cover the core logic for controllers, services, and libraries.

To add more tests:
1. Add test cases in the relevant `tests` file corresponding to the source file.
2. Run tests using `npm run test`.

## Contributing

Feel free to fork this repository and submit issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
