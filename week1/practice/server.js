const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

// Middleware (for every request)
app.use('/', express.json())
app.use(morgan('dev'))

/*
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://toddpolak:elliot@cluster0.0pymy.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })
console.log(client)
client.connect(err => {
    //const collection = client.db("test").collection("devices")
    // perform actions on the collection object
    //client.close();
})
*/

// Connect to DB
mongoose.connect('mongodb://localhost:27017/moviedb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
    //() => console.log('Connected to the DB')
)
    .then(() => console.log("Connected to MongoDB"))

// Routes
app.use('/movies', require('./routes/router'))

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({ errMsg: err.message })
})

// Server Listen
app.listen(9000, () => {
    console.log('The server is listening on port 9000!');
})
