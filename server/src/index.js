const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const dev = require('./config');


const connectToMongoDB = require('./config/db');
const userRouter = require('./routes/users');

const app = express();

const PORT = dev.app.serverPort;

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is running!'
    });
});



app.listen(PORT, async (req, res) => {
    console.log(`server is running at http://localhost:${PORT}`);
    await connectToMongoDB();
})