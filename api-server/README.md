# Assignment 

## Overview
This project consists of two Node.js servers (`api-server` and `worker-server`) that fetch, store, and serve cryptocurrency statistics using MongoDB, Redis Pub/Sub, and the CoinGecko API.

## Folder Structure
- `/api-server` — Main API server (Express, MongoDB, Redis)
- `/worker-server` — Background job publisher (Express, Redis)

## How to Run

### Prerequisites
- Node.js (v18+ recommended)
- Docker (for Redis) or local Redis installation
- MongoDB Atlas account (or local MongoDB)

### Setup

1. **Clone the repo**
2. **Install dependencies**  
   In both `api-server` and `worker-server`:
   ```bash
   npm install
   ```
3. **Set up `.env` files**  
   Example for `api-server/.env`:
   ```
   PORT=3000
   COINGECKO_API_KEY=your_coingecko_api_key
   MONGODB_URI=your_mongodb_atlas_uri
   REDIS_URL=redis://localhost:
   ```


4. **Start Redis**  
   (If using Docker)
   ```bash
   docker run --name redis -p 6379:6379 -d redis
   ```

5. **Start the servers**  
   In two terminals:
   ```bash
   # Terminal 1
   cd api-server
   npm start

   # Terminal 2
   cd worker-server
   npm start
   ```

## API Endpoints

- `GET /stats?coin=bitcoin` — Get latest stats for a coin
- `GET /deviation?coin=bitcoin` — Get price standard deviation for a coin

## Testing

- Run tests in each server:
  ```bash
  npm test
  ```
- Tests cover API endpoints and core logic.


## Architecture

- Worker-server publishes update events to Redis every 15 minutes.
- API-server subscribes to Redis, fetches data from CoinGecko, and stores it in MongoDB.
- API-server serves endpoints for stats and deviation.



