import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const fetchCryptoData = async () => {
  try {
    console.log('Fetching data from CoinGecko...');
    
    // Get API key from environment variables
    const apiKey = process.env.COINGECKO_API_KEY;
    
    // Log whether API key is available
    if (apiKey) {
      console.log('Using CoinGecko API key for authentication');
    } else {
      console.log('Warning: No CoinGecko API key found in environment variables');
    }
    
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          ids: 'bitcoin,matic-network,ethereum'
        },
        headers: {
          // Add API key to headers if available
          ...(apiKey && { 'x-cg-api-key': apiKey })
        }
      }
    );

    const data = response.data.map((coin) => ({
      coin: coin.id,
      price: coin.current_price,
      market_cap: coin.market_cap,
      change_24h: coin.price_change_percentage_24h
    }));

    console.log('Successfully fetched data for', data.length, 'coins');
    return data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return null;
  }
};

export default fetchCryptoData;

