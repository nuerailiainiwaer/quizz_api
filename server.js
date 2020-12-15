const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors');
const fileUpload = require('express-fileupload')
const cookieparser = require('cookie-parser')
const errhandler = require('./middleware/error')

const connectDB = require('./config/db')


//Load env vars
dotenv.config({ path: './config/config.env' })

// connect to database
connectDB();

//Route files 
const types = require('./routes/types');
const questions = require('./routes/questions');
const auth = require('./routes/auth');
const feedback = require('./routes/feedback');
const score = require('./routes/score');
const users = require('./routes/user');
const savedQuestion = require('./routes/savedQues');


const app = express();

///Body parser
app.use(express.json())

//Cookie parser
app.use(cookieparser());



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
app.use('/api/v1/auth', auth);
app.use('/api/v1/feedback', feedback);
app.use('/api/v1/score', score);
app.use('/api/v1/users', users);
app.use('/api/v1/savedquestions', savedQuestion);

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