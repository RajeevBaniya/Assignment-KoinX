# Assigment

## System Overview

This project consists of two independent servers that work together:

1. **API Server**: Handles data storage, API endpoints, and data processing
2. **Worker Server**: Manages scheduled tasks and background processing

<<<<<<< HEAD

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- CoinGecko API Key (free tier)
=======
>>>>>>> 1688ec8 (Update documentation, environment setup, and add tests)

### API Server Setup

```bash
cd api-server
npm install
# Create .env file with MongoDB and CoinGecko API settings
npm start
```

For more details, see the [API Server README](./api-server/README.md).

### Worker Server Setup

```bash
cd worker-server
npm install
# Create .env file with API server URL
npm start
```

For more details, see the [Worker Server README](./worker-server/README.md).

## API Endpoints

- `GET /stats?coin=bitcoin` - Returns latest cryptocurrency statistics
- `GET /deviation?coin=bitcoin` - Returns price standard deviation
- `GET /healthcheck` - Server health status

## Architecture

The system is designed with the following architecture:

1. **Worker Server** schedules jobs every 15 minutes and triggers the API server
2. **API Server** receives triggers, fetches data from CoinGecko, and stores it in MongoDB
3. **API Endpoints** serve the stored data and perform calculations when requested
4. **MongoDB** stores the cryptocurrency data in a structured format

## Technologies Used

- Node.js and Express for server implementation
- MongoDB for database
- Redis
- Mongoose for object modeling
- CoinGecko API for cryptocurrency data
- node-cron for job scheduling
- dotenv for environment variable management

