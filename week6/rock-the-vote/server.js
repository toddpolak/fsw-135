const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')

// Middleware (for every request)
app.use('/', express.json())
app.use(morgan('dev'))

// Connect to DB
mongoose.connect('mongodb://localhost:27017/rock-the-vote-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)
    .then(() => console.log("Connected to MongoDB"))

// Routes
app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) //req.user
app.use('/api/issues', require('./routes/issueRouter'))
app.use('/api/comments', require('./routes/commentRouter'))

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({ errMsg: err.message })
})

// Server Listen
app.listen(9000, () => {
    console.log('The server is listening on port 9000!');
})
