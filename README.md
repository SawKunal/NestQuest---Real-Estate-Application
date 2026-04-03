# NestQuest - Real Estate Application

NestQuest is a robust full-stack real estate application designed for seamless property browsing, listing, and direct communication. It features an intuitive user interface, interactive maps for location visualization, and real-time chat functionality for instant engagement between users and agents.

## Features

- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT) and HTTP-only cookies.
- **Property Listings**: Comprehensive property management allowing users to create, browse, and filter listings.
- **Interactive Maps**: Seamless integration with Leaflet for precise property location mapping.
- **Real-time Chat**: Instant messaging powered by Socket.io, enabling real-time communication between buyers and sellers.
- **Profile Management**: Personalized user dashboards to manage listings, saved posts, and profile details.
- **Saved Posts**: Efficient bookmarking system to keep track of interesting properties.
- **Responsive Design**: Fluid and modern UI built with SCSS, ensuring a great experience across all devices.

## Tech Stack

### Frontend

- **React**: Modern UI library with Vite for fast builds.
- **Zustand**: Lightweight state management for global application state.
- **React Router DOM**: Declarative routing for seamless navigation.
- **Sass (SCSS)**: Professional-grade CSS extension for styling.
- **React Leaflet**: Interactive maps for property locations.
- **Axios**: Promised-based HTTP client for API communication.
- **Socket.io-client**: Real-time bidirectional event-based communication.
- **Timeago.js**: Dynamic relative timestamps.

### Backend & Database

- **Node.js & Express.js**: High-performance runtime and framework for the API.
- **Socket.io**: Real-time engine for the chat service.
- **Prisma (ORM)**: Type-safe database client and schema management.
- **MongoDB**: Flexible NoSQL database for scalable data storage.
- **JWT & Bcrypt**: Secure authentication and password encryption.
- **Cookie Parser**: Middleware for handling cookie-based sessions.

## Project Structure

The project is organized into three main components:

- `/client`: The React frontend application.
- `/api`: The Node.js/Express backend server handling data and business logic.
- `/socket`: The dedicated Socket.io server for real-time chat functionality.

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- MongoDB account (local or cloud-based)
- Git

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/SawKunal/NestQuest---Real-Estate-Application
    cd NestQuest
    ```

2.  **Install Dependencies for all components**

    ```bash
    # Root directory
    npm install # if there are root dependencies

    # Client
    cd client && npm install

    # API
    cd ../api && npm install && npx prisma generate

    # Socket
    cd ../socket && npm install
    ```

### Configuration

Create a `.env` file in the `api` and `client` directories.

**api/.env**

```env
DATABASE_URL="mongodb+srv://..."
JWT_SECRET_KEY="your_secret_key"
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

**client/.env**

```env
VITE_API_BASE_URL="http://localhost:8800/api"
VITE_SOCKET_URL="http://localhost:4000"
```

### Running the Application

For a fully functional development environment, you need to run all three parts:

1.  **Start the Socket Server**

    ```bash
    cd socket
    # Using nodemon for auto-restarts
    nodemon app.js
    ```

    (Runs on `http://localhost:4000`)

2.  **Start the API Server**

    ```bash
    cd api
    nodemon app.js
    ```

    (Runs on `http://localhost:8800`)

3.  **Start the Client**
    ```bash
    cd client
    npm run dev
    ```
    (Runs on `http://localhost:5173`)

## Next Step

Implement the chat component with Socket.io 

## License

Distributed under the MIT License. See `LICENSE` for more information.
