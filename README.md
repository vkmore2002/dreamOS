# DreamOS MERN Stack Project

This is a full-stack MERN application scaffold with a structured client and server separation.

## Project Structure

```text
dreamOs/
├── client/           # React + Vite frontend
├── server/           # Express + Node.js backend
│   ├── src/
│   │   ├── config/   # Database and environment configurations
│   │   ├── controllers/ # Request handlers
│   │   ├── models/   # Mongoose schemas
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Custom middleware
│   │   └── index.js  # Entry point
├── .gitignore        # Root git ignore
└── package.json      # Root package file for managing the workspace
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB (local or Atlas)

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `/server` directory with the following:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   ```

3. **Run the Application**
   From the root directory:
   ```bash
   npm run dev
   ```
   This will start both the client and server concurrently.

## Scripts

- `npm run dev`: Runs both client and server in development mode.
- `npm run client`: Runs only the React client.
- `npm run server`: Runs only the Express server.
