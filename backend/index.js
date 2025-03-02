//importing exp

const express = require('express');
const UserRouter = require( './routers/userRouter');
const productRouter = require('./routers/productRouter')
const reviewRouter = require('./routers/reviewRouter')
const cartRouter = require('./routers/cartRouter');
const addressRouter = require('./routers/addressRouter');
const cors = require('cors');

//creating an express app
const app = express();
const port = 5000;

// middleware
app.use(cors({
    origin: ['http://localhost:3001']
}));
app.use(express.json());
app.use('/users', UserRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter)
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
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