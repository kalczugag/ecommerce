<div align="center">

# E-Commerce Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/kalczugag/ecommerce/blob/main/LICENSE)
[![Build](https://github.com/Kosmit147/Zenith/actions/workflows/build.yml/badge.svg)](https://github.com/kalczugag/ecommerce/actions/workflows/build.yml)

This is a fully functional e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack. It offers a seamless shopping experience for users and includes features like authentication, role-based access control (RBAC), and an admin panel for product management. The website is secure, scalable, and built with token-based authentication using JWT (JSON Web Token).

</div>

## Demo

Checkout live demo:

- Client: [demo](https://ecommerce-frontend-six-black.vercel.app/)
- Admin: [demo](https://ecommerce-admin-seven-cyan.vercel.app/)

> **Note:** The demo may work incorrectly or exhibit unexpected behavior as new features and updates are being actively added.

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **User Authentication**: Token-based authentication using JWT for secure login and registration.
-   **Role-Based Access Control (RBAC)**: Access restrictions based on user roles (e.g., admin, customer).
-   **Admin Panel**: Manage products, users, orders, and categories via a secure admin interface.
-   **Product Search & Filtering**: Advanced search and filter options for users to easily find products.
-   **Shopping Cart**: Add/remove items, manage quantities, and proceed to checkout.
-   **Order Management**: Users can view their order history and order details.
-   **Secure Payment Gateway**: Integrated with a payment provider for safe and secure transactions.
-   **Responsive Design**: Mobile-friendly interface for a smooth shopping experience on any device.

## Tech Stack

-   **Frontend**:

    -   [React](https://reactjs.org/)
    -   [Redux](https://redux.js.org/) for state management
    -   [React Router](https://reactrouter.com/) for navigation
    -   [Tailwind CSS](https://tailwindcss.com/) or custom CSS for styling

-   **Backend**:

    -   [Node.js](https://nodejs.org/)
    -   [Express](https://expressjs.com/) for API and server management
    -   [MongoDB](https://www.mongodb.com/) as the NoSQL database
    -   [Redis](https://redis.io/) for caching and session management
    -   [JWT](https://jwt.io/) for token-based authentication

-   **Other Technologies**:
    -   [Mongoose](https://mongoosejs.com/) for MongoDB object modeling
    -   [Stripe](https://stripe.com/) for payment processing
    -   [Nodemailer](https://nodemailer.com/about/) for sending emails (e.g., order confirmation)

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1.[Clone the repository](INSTALLATION.md#step-1-Clone-the-repository)

2.[Update Backend Environment Variables](INSTALLATION.md#step-2-Update-Backend-Environment-Variables)

3.[Update Frontend and Admin Environment Variables](INSTALLATION.md#step-3-Update-Frontend-and-Admin-Environment-Variables)

4.[Install Backend Dependencies](INSTALLATION.md#Step-4-Install-Backend-Dependencies)

5.[Run the Backend Server](INSTALLATION.md#Step-5-Run-the-Backend-Server)

6.[Install Frontend Dependencies](INSTALLATION.md#Step-6-Install-Frontend-Dependencies)

7.[Run the Frontend Server](INSTALLATION.md#Step-7-Run-the-Frontend-Server)

8.[Install Admin Panel Dependencies](INSTALLATION.md#Step-8-Install-Admin-Panel-Dependencies)

9.[Run the Admin Panel Server](INSTALLATION.md#Step-9-Run-the-Admin-Panel-Server)

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes and commit them**:
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```sh
    git push origin feature/your-feature-name
    ```
5. **Open a pull request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact us at [kalczugag@gmail.com](mailto:kalczugag@gmail.com).

---

Thank you for using E-Commerce App! We hope it enhances your communication experience.
