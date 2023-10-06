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
const { authenticateWithKingsChat } = require('./kingschatAuth');

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
    origin: 'https://hs-front.netlify.app',
    // origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello')
})
app.post('/kingschat/authenticate', async (req, res) => {
    // Get user credentials from the request (e.g., req.body)
    const userCredentials = {
        email: req.body.email,
        password: req.body.password,
        // Include other required fields as needed.
    };
    console.log(userCredentials);
    try {
        const authToken = await authenticateWithKingsChat(userCredentials);

        // Handle success, send back the authToken or a success response.
        res.json({ authToken });
    } catch (error) {
        // Handle errors and send an error response.
        res.status(500).json({ error: 'Authentication failed' });
    }
});

// Backend route to handle KingsChat callback
app.get('/auth/kingschat/callback', async (req, res) => {
    try {
        // Obtain the authorization code from the request query parameters
        const authorizationCode = req.query.code;

        // Exchange the authorization code for an access token and possibly a refresh token
        const tokens = await exchangeAuthorizationCodeForTokens(authorizationCode);

        // Validate the access token
        const isValidToken = validateAccessToken(tokens.access_token);

        if (isValidToken) {
            // Use the access token to make authenticated requests to KingsChat's API
            const userData = await fetchUserData(tokens.access_token);

            // Store the user data or handle it as needed
            // ...
            console.log(userData);
            // Redirect or respond to your frontend application
            res.redirect('/profile'); // Redirect to a user profile page, for example
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// app.use(notFound)
app.use('/auth/facebook', facebookRoute)
app.use("/api/v1/users", userRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log();
})