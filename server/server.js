import 'dotenv/config'
import express from "express";
import connectDB from './utils/db.js';
import productRoute from './routes/product-router.js';
import categoryRoute from './routes/category-router.js';
import cors from "cors";
import authRoute from './routes/auth-router.js';
import userRoute from './routes/customer/details/user-data-get-router.js';
import errorMiddleware from './middlewares/error-middleware.js';
import statusRoute from './routes/status-router.js';
import cartRoute from './routes/customer/cart/cart-router.js';
import reviewRoute from './routes/customer/review/review-router.js';
import dynamicRoute from './routes/dynamic-router.js';

//create express server
const app = express();

//middleware
//handaling cors poicy issue
//(that create when client request to server in differnt route(differnt route of client and server))
var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
//for use request body data as json
app.use(express.json());

//routes
app.use('/auth', authRoute);
app.use('', userRoute);
app.use('/categories', categoryRoute);
app.use('/products', productRoute);
app.use('/reviews', reviewRoute);
app.use('/cart', cartRoute);
app.use('/status', statusRoute);
app.use('/dynamic', dynamicRoute)

//middleware
app.use(errorMiddleware);

//server run
const startServer = async () => {
    await connectDB();
    const port = 3030;
    app.listen(port, () => {
        console.log(`Server is running on ${port}...`);
    })
};
startServer();