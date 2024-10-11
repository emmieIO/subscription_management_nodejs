const express = require('express');
const { configDotenv } = require('dotenv');
const morgan = require('morgan')
const v1router = require('./routes/router.js');
const errorHandler  = require('./utils/errorHandler.js');


configDotenv();
const app = express();
const port = process.env.PORT || 3000

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())

app.use('/api/v1', v1router);

app.use(errorHandler);


app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})