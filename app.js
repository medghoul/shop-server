const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const config = require('./app/config/config.json');
const mongo = require('./app/common/dbConnection');
const userRouter = require('./app/routes/UserRouter');
const clientRouter = require('./app/routes/ClientRouter');
const messageRouter = require('./app/routes/MessageRouter');
const destinationRouter = require('./app/routes/DestinationRouter');
const productRouter = require('./app/routes/ProductRouter');
const cartRouter = require('./app/routes/CartRouter');
const orderRouter = require('./app/routes/OrderRouter');
const articleRouter = require('./app/routes/ArticleRouter');

//Connect to database
mongo.connectToDatabase();

// use the modules
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 5000000, limit: '20mb' }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/users', userRouter);
app.use('/clients',clientRouter);
app.use('/messages', messageRouter);
app.use('/destinations', destinationRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    res.send('<h2>Hi there! from shop server</h2>');
});

// Start the server
app.listen(config.api_port, () => {
    console.log(`Server is running on http://localhost:${config.api_port}`);
});
