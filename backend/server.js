const express = require('express')
const app = express()
// const notFound = require('./middleware/Notfound')
require('./passport')
const passport = require('passport')
const facebookRoute = require('./routes/auth')
const cookieSession = require('cookie-session')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.port || 5000

app.use(cookieSession({
    name: 'session', keys: ['session'], maxAge: 24 * 60 * 60 * 100
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.get('/', (req,res)=>{
    res.json('Hello')
})
// app.use(notFound)
app.use('/auth/facebook', facebookRoute)
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})