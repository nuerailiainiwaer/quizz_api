const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors');
const fileUpload = require('express-fileupload')
const errhandler = require('./middleware/error')

const connectDB = require('./config/db')


//Load env vars
dotenv.config({ path: './config/config.env' })

// connect to database
connectDB();

//Route files 
const types = require('./routes/types');
const questions = require('./routes/questions');


const app = express();

///Body parser
app.use(express.json())


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// File upload
app.use(fileUpload());

// Set static folder// setting public as static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount routers
app.use('/api/v1/types', types);
app.use('/api/v1/questions', questions);

app.use(errhandler);


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