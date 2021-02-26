require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser')
const cors  = require('cors')
const mongoose = require('mongoose')
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const authRouter = require('./auth/auth-router');
const memberRouter = require('./routes/member');
const {ATLAS_URI} = require('./config');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Connection code 
const uri = ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/members', memberRouter);
app.use('/api/auth', authRouter);

//starts server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});