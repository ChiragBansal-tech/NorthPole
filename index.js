const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const session = require('express-session')
const app = express();
const userRoute = require('./routes/user');
const ProductRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/users').then(e => console.log('MongoDB connected'))

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'RandomSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use(cors({
    origin: "*"
}));

app.use('/user', userRoute);
app.use('/product', ProductRoute);
app.use('/cart', cartRoute);

app.listen(PORT, () => console.log(`Server has started at PORT: ${PORT}`))