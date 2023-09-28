const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()

// const idNumber = Math.random() * 1000
const generateToken = (id) => {
    return jwt.sign({id}, "secret", {
        expiresIn: "1hr"
    })
}
// console.log(generateToken(idNumber));
module.exports = generateToken