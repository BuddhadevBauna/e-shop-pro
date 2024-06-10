import 'dotenv/config'
import express from "express";
import connectDB from './utils/db.js';
import productRoute from './routes/product-router.js';

//create express server
const app = express();

//middleware
app.use(express.json());

//routes
app.use('/products/', productRoute);

//server run
const startServer = async () => {
    await connectDB();
    const port = 3030;
    app.listen(port, () => {
        console.log(`Server is running on ${port}...`);
    })
};
startServer();