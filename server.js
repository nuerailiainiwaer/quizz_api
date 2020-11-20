const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors');

const connectDB = require('./config/db')


//Load env vars
dotenv.config({ path: './config/config.env' })

// connect to database
connectDB();



//Route files 
const types = require('./routes/types');
const connnectDB = require('./config/db');

const app = express();
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}



//Mount routers
app.use('/api/v1/types', types);


// Route

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
    //handle unhandled promise rejections
process.on('unhandledRejection', (err, primise) => {
    console.log(`Error: ${err.message}`.red)
        // close server and exit process
    server.close(() => {
        process.exit(1)
    })

})