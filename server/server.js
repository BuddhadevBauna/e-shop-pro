import 'dotenv/config'
import express from "express";
import connectDB from './utils/db.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from './middlewares/error-middleware.js';
import dynamicRoute from './routes/dynamic-router.js';
import statusRoute from './routes/status-router.js';
import authRoute from './routes/auth-router.js';
import userRoute from './routes/user-data-get-router.js';
import categoryRoute from './routes/category-router.js';
import productRoute from './routes/product-router.js';
import cartRoute from './routes/customer/cart/cart-router.js';
import ratingRoute from './routes/customer/rating-and-review/rating-router.js'
import reviewRoute from './routes/customer/rating-and-review/review-router.js'
import ratingAndReviewsRoute from './routes/customer/rating-and-review/rating-and-reviews-router.js';
import ratingAndReviewRoute from './routes/customer/rating-and-review/rating-and-review-router.js';
import addressRoute from './routes/customer/address/address-router.js';
import notificationRoute from './routes/customer/notification/notification-router.js';
import wishlistRoute from './routes/customer/wishlist/wishlist-router.js';

//create express server
const app = express();

// Overriding console.log to capture the source of the log
const originalLog = console.log;

console.log = (...args) => {
    const stack = new Error().stack;
    const stackLines = stack.split('\n');
    const logSource = stackLines[2].trim();

    // Loop through all arguments passed to console.log
    args.forEach((arg) => {
        // If the argument is an object, stringify it
        if (typeof arg === 'object') {
            arg = JSON.stringify(arg, null, 2); // pretty print the object
        }
    });

    // Print the log source
    originalLog(`Log Source: ${logSource}`);
    // Print the original log message or object (now stringified if it's an object)
    originalLog(...args);
};


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
app.use(cookieParser());

//for adding or deleteing dynamic field
app.use('/dynamic', dynamicRoute);

//main routes
app.use('/status', statusRoute);
app.use('/auth', authRoute);
app.use('', userRoute);
app.use('/categories', categoryRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/ratings', ratingRoute)
app.use('/reviews', reviewRoute);
app.use('/rating-and-reviews', ratingAndReviewsRoute);
app.use('/rating-and-review', ratingAndReviewRoute);
app.use('/addresses', addressRoute);
app.use('/notifications', notificationRoute);
app.use('/wishlists', wishlistRoute);


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