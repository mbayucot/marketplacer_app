# Marketplacer App

This project is a Marketplacer app that includes functionalities such as product listing, product detail page, add to cart, and show cart. The project is built with Vite and uses a modern stack including Material UI, React Query, React Hook Form, Zod, and Zustand for state management.

## Setup

To set up the application, run the following command:

```
npm install
```

This command will install all necessary dependencies.

Running the Application
To start the application, run:

```
npm run dev
```

The application will be available at http://localhost:5173.

For end-to-end tests using Playwright, run:

```
npm run test:e2e
```

## Development
### Styling with Material UI
Material UI is used for styling and component design. You can customize the theme in src/theme.ts.

### Data Fetching with React Query
React Query is used for data fetching and caching. It provides hooks for fetching, caching, and updating data in your React applications.

### Form Handling with React Hook Form and Zod
React Hook Form is used for managing form state and validation. Zod is used for schema validation.

### State Management with Zustand
Zustand is a small, fast, and scalable state-management solution. It is used for managing global state such as authentication and cart state.

## Features
### Product Listing
Displays a list of products fetched from the backend using React Query.

### Product Detail Page
Displays detailed information about a selected product.

### Add to Cart
Handles adding products to the shopping cart. The add-to-cart functionality is managed in the backend and fetched using React Query.

### Show Cart
Displays the contents of the shopping cart, including product details and total cost.




