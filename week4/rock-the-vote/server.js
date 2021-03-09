const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')

// Middleware (for every request)
app.use('/', express.json())
app.use(morgan('dev'))

// Connect to DB
mongoose.connect('mongodb://localhost:27017/inventorydb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
    .then(() => console.log("Connected to MongoDB"))

// Routes
app.use('/users', require('./routes/authRouter'))
app.use('/issues', require('./routes/issueRouter'))
app.use('/comments', require('./routes/commentRouter'))

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({ errMsg: err.message })
})

// Server Listen
app.listen(9000, () => {
    console.log('The server is listening on port 9000!');
})
