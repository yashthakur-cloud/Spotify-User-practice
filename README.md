# Spotify-User-practice
# Spotify User Practice Backend

A basic Node.js and Express backend for user authentication, artist-protected music uploads, album creation, and listing music records.

## Features

- User registration and login
- JWT authentication stored in cookies
- Role-based access for users and artists
- Music upload endpoint using Multer memory storage
- ImageKit file storage integration
- MongoDB database connection with Mongoose

## Tech Stack

- Node.js
- Express
- MongoDB and Mongoose
- JSON Web Tokens
- bcryptjs
- Multer
- ImageKit

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the server:

```bash
node server.js
```

The server runs on:

```text
http://localhost:3000
```

## API Routes

### Auth

```text
POST /api/auth/register
POST /api/auth/login
```

### Music

```text
POST /api/music/upload
POST /api/music/album
GET /api/music
```

## Environment Variables

This project uses environment variables for configuration. Keep `.env` private and do not commit it to version control.

Required variables:

```text
MONGO_URI
JWT_SECRET
IMAGEKIT_PRIVATE_KEY
```

## Project Structure

```text
src/
  controllers/
  db/
  middlewares/
  models/
  routes/
  services/
server.js
```
