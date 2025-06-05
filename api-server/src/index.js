import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/index.js';
import coinRouter from './routes/coin.router.js';
import { createClient } from 'redis';
import fetchCryptoData from './services/fetchCryptoData.js';
import storeCryptoData from './services/storeCryptoData.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/healthcheck", (req, res) => res.send("Healthy"));

// API routes
app.use('/', coinRouter);

// Start the server
const PORT = process.env.PORT;
const REDIS_URL = process.env.REDIS_URL;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Immediately fetch and store data for testing
    console.log('Immediately fetching and storing data for testing...');
    const cryptoData = await fetchCryptoData();
    if (cryptoData) {
      console.log('Got crypto data:', cryptoData);
      await storeCryptoData(cryptoData);
    } else {
      console.error('Failed to fetch crypto data at startup');
    }
    
    // Set up Redis subscriber
    const subscriber = createClient({
      url: REDIS_URL
    });

    // Connect to Redis
    await subscriber.connect();
    console.log('Connected to Redis');

    // Subscribe to crypto-updates channel
    await subscriber.subscribe('crypto-updates', async (message) => {
      try {
        const data = JSON.parse(message);
        if (data.trigger === 'update') {
          console.log('Received update trigger from Redis');
          const cryptoData = await fetchCryptoData();
          if (cryptoData) {
            console.log('Storing crypto data...');
            await storeCryptoData(cryptoData);
          }
        }
      } catch (error) {
        console.error('Error processing Redis message:', error);
      }
    });
<<<<<<< HEAD
  
=======
>>>>>>> 1688ec8 (Update documentation, environment setup, and add tests)
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
    
    // Handle graceful shutdown
    const cleanup = async () => {
      console.log('Shutting down API server...');
      await subscriber.quit();
      process.exit(0);
    };
    
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);
<<<<<<< HEAD
=======

export default app;
>>>>>>> 1688ec8 (Update documentation, environment setup, and add tests)
