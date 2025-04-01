# Ecommerce-Website

A modern and user-friendly eCommerce website built using Vite and React. This project provides a seamless shopping experience with product filtering, a shopping cart, and a checkout process.

## Features

- Product Listing with Filtering
- Shopping Cart Management
- Checkout Process
- Responsive Design

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Phal-Sovandy/Final_Project---Front-End.git
   cd ./Final_Project---Front-End/Ecommerce-Website
   ```

2. Install dependencies:
   ```sh
   npm install
   npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
   npm install react-router-dom
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

The app will be available at `http://localhost:5173/`

## Folder Structure
```
Ecommerce-Website/
|-- public/
|   |-- ratings/         # Rating-related assets
|
|-- src/
|   |-- assets/          # Images, icons, etc.
|   |-- backend/         # Backend-related files
|   |-- components/      # Reusable components
|   |-- context/         # Context (useContext)
|   |-- data/            # Data-related files
|   |-- layouts/         # Layout components
|   |-- pages/           # Pages like Home, Shops, Checkout, Contacts
|   |-- styles/          # Global styles
|   |-- utils/           # Utility functions
|   |-- App.jsx          # Main App component
|   |-- main.jsx         # Entry point
|
|-- .gitignore
|-- README.md
|-- eslint.config.js
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
```

## Usage
- Browse products on the home page.
- Use the sidebar to filter products based on categories.
- Add items to the shopping cart.
- Proceed to checkout and complete the purchase.

## Technologies Used
- Vite
- React
- React Router
- Context
- FontAwesome Icons
- CSS

## Conclusion
This eCommerce website provides a smooth shopping experience with essential features like product filtering, cart management, and a streamlined checkout process. Built with modern web technologies, it ensures fast performance and an engaging user experience. Future enhancements may include user authentication, payment integration, and more advanced analytics.

