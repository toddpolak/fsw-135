const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

// Middleware (for every request)
app.use('/', express.json())
app.use(morgan('dev'))

// Connect to DB

// mongoose.connect('mongodb://localhost:27017/moviedb',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }
//     //() => console.log('Connected to the DB')
// )
//     .then(() => console.log("Connected to MongoDB"))

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/moviedb');
    console.log("Connected to the DB")
}

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
