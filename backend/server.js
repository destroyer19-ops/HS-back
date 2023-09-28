const express = require('express')
const app = express()
// const notFound = require('./middleware/Notfound')
require('./passport')
const passport = require('passport')
const facebookRoute = require('./routes/auth')
const cookieSession = require('cookie-session')
const userRouter = require('./routes/UserRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.port || 5000


// connect to database
mongoose.connect('mongodb://127.0.0.1:27017')
.then(() => {
        console.log('Database Successfully Connected');
    })
.catch((err) => {
        console.log(err);
    })

app.use(cookieSession({
    name: 'session', keys: ['session'], maxAge: 24 * 60 * 60 * 1000
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    // origin: 'https://hsfront.netlify.app',
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.use(express.json())

app.get('/', (req,res)=>{
    res.json('Hello')
})
// app.use(notFound)
app.use('/auth/facebook', facebookRoute)
app.use("/api/v1/users", userRouter)

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
    console.log();
})