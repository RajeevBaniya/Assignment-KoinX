import Crypto from "../models/crypto.modle.js";

export const stats =  async (req, res) => {
  const { coin } = req.query;

  // Validate the query parameter
  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin parameter' });
  }

  try {
    // Debug log - show the query we're making
    console.log(`Searching for coin: "${coin}" in database`);
    
    // Count total documents in the collection
    const totalDocs = await Crypto.countDocuments();
    console.log(`Total documents in collection: ${totalDocs}`);
    
    // Fetch the latest data for the requested coin
    const latestData = await Crypto.findOne({ coin }).sort({ date: -1 });

    // If no data is found, return an error
    if (!latestData) {
      console.log(`No data found for coin: ${coin}`);
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    console.log(`Found data for ${coin}:`, latestData);
    
    // Return the latest data
    return res.json({
      price: latestData.price,
      marketCap: latestData.market_cap,
      "24hChange": latestData.change_24h
    });
  } catch (error) {
    console.error('Error fetching coin data:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};


const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
};

 export const deviation = async (req, res) => {
  const { coin } = req.query;

  // Validate the query parameter
  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin parameter' });
  }

  try {
    // Debug log - show the query we're making
    console.log(`Calculating deviation for coin: "${coin}"`);
    
    // Count total documents for this coin
    const coinCount = await Crypto.countDocuments({ coin });
    console.log(`Total documents for ${coin}: ${coinCount}`);
    
    // Fetch the last 100 records for the specified coin
    const records = await Crypto.find({ coin }).sort({ date: -1 }).limit(100);

    // If no data is found, return an error
    if (records.length === 0) {
      console.log(`No data found for coin: ${coin} when calculating deviation`);
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    // Extract the prices from the records
    const prices = records.map(record => record.price);
    console.log(`Found ${prices.length} price records for ${coin}`);

    // Calculate the standard deviation of the prices
    const deviation = calculateStandardDeviation(prices);

    // Return the standard deviation in the response
    return res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};