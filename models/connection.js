require('dotenv').config();
const mongoose = require('mongoose');// import mongoose

mongoose .connect(process.env.DBURL); // connect to the mongo db using the connections

//optional line of code to check that we have a connection to the db
mongoose.connection.on('open', () => console.log("Connected")).on('close', () => console.log("Disconnected")).on('error', (err) => console.log('error', err))

//export mongoose the variable with all its configurations above 
module.exports = mongoose 