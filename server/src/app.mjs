import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.mjs';
import routes from './routes/index.mjs';

dotenv.config();
const app = express();

//middlewares
app.use(express.json());

//database
connectDB();

//routes
app.use('/api', routes);

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
