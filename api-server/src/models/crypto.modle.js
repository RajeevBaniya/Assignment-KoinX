import e from 'express';
import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum'],
  },
  price: {
    type: Number,
    required: true,
  },
  market_cap: {
    type: Number,
    required: true,
  },
  change_24h: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});



export default mongoose.model('Crypto', cryptoSchema);
