const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const OrderRouter = require('./routers/OrderRouter.js');


require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/**
 * Connect to Mongoose
 */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('CONNECT TO MONGOOSE');
});


app.use('/api/order', OrderRouter);

app.listen(3000);