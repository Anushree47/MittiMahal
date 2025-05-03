const express = require('express');
const {verifyUser}= require('./middlewares/authMiddleware');
const UserRouter = require( './routers/userRouter');
const productRouter = require('./routers/productRouter')
const reviewRouter = require('./routers/reviewRouter')
const recommendationRouter  = require ('./routers/recommendationRouter')
 const cartRouter = require('./routers/cartRouter');
const addressRouter = require('./routers/addressRouter');
const orderRouter = require('./routers/orderRouter');
const AdminRouter = require('./routers/admin');
const contactRouter = require('./routers/contactRouter');
const paymentRouter = require('./routers/paymentRouter');
const wishlistRouter = require('./routers/wishlistRouter');

const cors = require('cors');

//creating an express app
const app = express();
const port = 5000;

// middleware
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.use(express.json());

app.use('/admin',AdminRouter);
app.use('/users', UserRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter)
app.use('/wishlist', wishlistRouter);
app.use('/cart', cartRouter);
app.use('/Address', addressRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);
app.use('/contact', contactRouter);
app.use('/UserActivity', recommendationRouter);
// route or endpoint
app.get('/', (req, res) => {
    res.send('response from express');
});

app.get('/add', (req, res) => {
    res.send('response from add');
});

app.get('/getall', (req, res) => {
    res.send('response from getall');
});

app.get('/delete', (req, res) => {
    res.send('response from delete');
});

//start the server
app.listen(port, () => {
    console.log('server started');
})