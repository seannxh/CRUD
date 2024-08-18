require('dotenv').config()/// this line reads our env file

const express = require(`express`);
const Cars = require('./models/car.js')
const app = express();
const MethodOverride = require('method-override');
const cars = require('./models/car.js');

//MIDDLEWARE
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true}))//reads form data
app.use(MethodOverride('_method')); //looks for querty parameter of _method in the request //then override with whatever is after _method
const PORT = process.env.PORT

app.get('/', (req, res) =>{
    res.render('home.ejs')
})

app.get('/cars',  async (req, res) => {
    try{
        let carsspec = await Cars.find({})
        console.log({y : carsspec})
        res.render('carshome.ejs',{y : carsspec})
    }catch(err){
        res.status(400).json(err)
    }    
})

app.post('/cars', async (req, res) => {
    try{
        if(req.body.Aftermarket === "on"){
            req.body.Aftermarket = true
        }else{
            req.body.Aftermarket = false
        }
        req.body.carYear = Number(req.body.carYear)
        req.body.carMileage = Number(req.body.carMileage)
        await Cars.create(req.body)
        console.log(req.body)
        res.redirect('/cars')
    }catch(err){
        res.status(400).json(err)
    } 
})

app.get('/cars/new', (req, res) => {
    res.render('carlisting.ejs')
})

app.get('/cars/:id', async (req, res) => {
    const carsspec = await Cars.findById(req.params.id)
    res.render('caredit.ejs', {x : carsspec})
})

app.put('/cars/:id', async (req, res) => {
    try{
        if(req.body.Aftermarket === "on"){
            req.body.Aftermarket = true
        }else{
            req.body.Aftermarket = false
        }
        req.body.carYear = Number(req.body.carYear)
        req.body.carMileage = Number(req.body.carMileage)
        await Cars.findByIdAndUpdate(req.params.id, req.body)
        console.log('Sucessfully Edited Listing', req.params, req.body)
        res.redirect('/cars')
    }catch(err){
        res.status(400).json(err)
    } 
})

app.delete('/cars/:id', async (req, res) => {
    let carsspec = await Cars.find({})
    await Cars.findByIdAndDelete(req.params.id)
    console.log("Succesfully Deleted Listing")
    res.redirect('/cars')
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});