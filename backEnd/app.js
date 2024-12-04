import express from 'express';
import dbConfig from './config/dbConfig.js';
import adminRoute from './routes/adminRoute.js';
import dashBoardRoute from './routes/dashBoardRoute.js';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from'dotenv';
import session from 'express-session';
import { sessionMid } from './config/sessionConfig.js';



dbConfig();
const app = express();


app.use(morgan('dev'));
app.use(sessionMid);
app.use(express.json());
dotenv.config();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend application
  credentials: true // Allow credentials (cookies)
}));

  app.use('/admin', adminRoute);
  app.use('/dashBoard', dashBoardRoute);

export default app;

