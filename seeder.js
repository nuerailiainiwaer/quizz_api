const fs = require('fs');
const mongoose = require('mongoose');
const color = require('colors')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

///Load models

const Type = require('./models/Types');
const Questions = require('./models/Questions')
const asynHandler = require('./middleware/async');

//connect to DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

})

const types = JSON.parse(fs.readFileSync(`${__dirname}/data/types.json`, 'utf-8'));
const questions = JSON.parse(fs.readFileSync(`${__dirname}/data/questions.json`, 'utf-8'));

//Import into DB
const importDate = async() => {
    try {
        await Type.create(types);
        await Questions.create(questions);
        console.log('Data Imported...'.green.inverse);
        process.exit()
    } catch (err) {
        console.log(err);
    }
}

///DELETE DATA

const deleteData = async() => {
    try {
        await Type.deleteMany();
        await Questions.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

if (process.argv[2] === '-i') {
    importDate();
} else if (process.argv[2] === '-d') {
    deleteData();

}