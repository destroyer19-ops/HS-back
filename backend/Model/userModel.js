const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true,'Please Enter a Valid Email']
        },
        name: {
            type: String,
            required: [true, 'Please enter a valid Name']
        },
        password: {
            type:String,
            required: [true, 'Please enter your password']
        }, 
        birthday: {
            type:String,
            required: [false, 'Please enter your Birthday']
        }, 
        // isAdmin:{
        //     type: Boolean,
        //     default: false,
        // },
        // role:{
        //     type: String,
        //     enum: ["admin", "Guest", "user"]
        // }
    },{
        timestamps: true,
    }

)
const User = mongoose.model('User', userSchema)
module.exports = User