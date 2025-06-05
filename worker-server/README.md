# Worker Server (KoinX Crypto Assignment)

## Overview
This is the background job server for the crypto assignment. It publishes update events to Redis every 15 minutes (or via manual trigger) to signal the API server to fetch and store the latest cryptocurrency statistics.

## Folder Structure
- `/worker-server` — Background job publisher (Express, Redis)

## How to Run

### Prerequisites
- Node.js (v18+ recommended)
- Docker (for Redis) or local Redis installation

### Setup

1. **Clone the repo**
2. **Install dependencies**  
   In `worker-server`:
   ```bash
   npm install
   ```
3. **Set up `.env` file**  
   Example for `worker-server/.env`:
   ```
   PORT=3001
   REDIS_URL=redis://localhost:
   ```

4. **Start Redis**  
   (If using Docker)
   ```bash
   docker run --name redis -p 6379:6379 -d redis
   ```

5. **Start the worker server**
   ```bash
   npm start
   ```

## Endpoints

- `GET /healthcheck` — Check if the worker server is running
- `GET /trigger` — Manually trigger an update event (for testing)

## How it Works
- Every 15 minutes, the worker-server publishes an update event to Redis.
- The API server listens for this event and fetches new crypto data.
- You can also manually trigger an update by calling `/trigger`.

## Testing

- Run tests in the worker-server:
  ```bash
  npm test
  ```
- Tests cover the `/healthcheck` endpoint.


