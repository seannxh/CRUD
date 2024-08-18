const mongoose = require('./connection.js');

const carSchema = new mongoose.Schema({
    carName: String,
    carBrand: String,
    carYear: Number,
    carMileage: Number,
    carTrim: String,
    Aftermarket: Boolean,
    imageUrl: String,
    price: Number
});

const cars = mongoose.model('cars', carSchema);

module.exports = cars