// Config
import 'dotenv/config';

// Server
import express from 'express';
import cors from 'cors';

// Routers
import productRouter from './v1/routes/productRoute.js';
import categoryRouter from './v1/routes/categoryRoute.js';

const app = express();
const port = process.env.PORT | 3000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});