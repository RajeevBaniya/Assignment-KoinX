import cron from 'node-cron';
import dotenv from 'dotenv';
import express from 'express';
import { createClient } from 'redis';


try {
  dotenv.config();
  console.log('Environment loaded from .env file');
} catch (error) {
  console.log('No .env file found, using default configuration');
}

<<<<<<< HEAD
const PORT = process.env.PORT || 3001;
const API_SERVER_URL = process.env.API_SERVER_URL || 'http://localhost:3000';
=======
// Default configuration - will work even without a .env file
const PORT = process.env.PORT;
const REDIS_URL = process.env.REDIS_URL;
>>>>>>> 1688ec8 (Update documentation, environment setup, and add tests)

// Create Express app for health check endpoint
const app = express();

console.log('=== Cryptocurrency Worker Server ===');
console.log(`PORT: ${PORT}`);
console.log(`REDIS_URL: ${REDIS_URL}`);
console.log('====================================');

app.get('/healthcheck', (req, res) => {
  console.log('Health check request received');
  res.send('Worker server is healthy');
});

app.get('/trigger', async (req, res) => {
  console.log('Manual trigger received');
  await triggerUpdate();
  res.send('Update triggered');
});

async function triggerUpdate() {
  try {
    console.log(`[${new Date().toISOString()}] Triggering update...`);
    
    // Create Redis client
    const publisher = createClient({
      url: REDIS_URL
    });

    // Connect to Redis
    await publisher.connect();
    
<<<<<<< HEAD
    
    try {
      const response = await axios.get(`${API_SERVER_URL}/healthcheck`);
      console.log('API server is healthy:', response.data);
    } catch (error) {
      console.log('API server might be down or not accessible:', error.message);
    }
=======
    // Publish message to Redis
    await publisher.publish('crypto-updates', JSON.stringify({ trigger: 'update' }));
    console.log('Published update message to Redis');
    
    // Close Redis connection
    await publisher.quit();
>>>>>>> 1688ec8 (Update documentation, environment setup, and add tests)
    
  } catch (error) {
    console.error('Error triggering update:', error.message);
  }
}

async function main() {
  try {
    // Schedule job to run every 15 minutes
    cron.schedule('*/15 * * * *', async () => {
      console.log('Running scheduled job at:', new Date().toISOString());
      await triggerUpdate();
    });
    
    // For testing - run job immediately on startup
    console.log('Running initial job on startup');
    await triggerUpdate();
    
    // Start Express server for health checks and manual triggers
    app.listen(PORT, () => {
      console.log(`Worker server started on port ${PORT}, publishing updates every 15 minutes`);
      console.log(`Health check: http://localhost:${PORT}/healthcheck`);
      console.log(`Manual trigger: http://localhost:${PORT}/trigger`);
    });
    
    // Handle graceful shutdown
    const cleanup = async () => {
      console.log('Shutting down worker server...');
      process.exit(0);
    };
    
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    
  } catch (error) {
    console.error('Failed to start worker server:', error);
    process.exit(1);
  }
}

main().catch(console.error); 
<<<<<<< HEAD
=======

export default app;
>>>>>>> 1688ec8 (Update documentation, environment setup, and add tests)
