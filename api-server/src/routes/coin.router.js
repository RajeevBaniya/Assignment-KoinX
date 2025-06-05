import express from 'express';
import { deviation, stats } from '../controllers/coin.controller.js';



const coinRouter = express.Router();

coinRouter.get('/deviation', deviation);
coinRouter.get('/stats', stats);


export default coinRouter;
