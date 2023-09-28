const User = require("../Model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require("../token/token")
const registerCtrl = async (req, res) => {
    const findUser = await User.findOne({ email: req.body.email })
    // console.log(findUser);
    try {
        if (findUser) {
            res.status(400).json({ msg: 'Email exists' })
        } else {
            const { email, name, password } = req.body;
            const saltRounds = 10;
            const hashPassword = bcrypt.hashSync(password, saltRounds)
            const user = await User.create({ email, name, password: hashPassword })
            res.status(200).json({ msg: 'Register success', user })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
// @desc    Logout user
// route    POST /api/v1/users/logout
// @access  Private
const logoutCtrl = async(req,res) => {
    res.status(200).json({msg: 'Logout User'})
}

// @desc    Logout user
// route    GET /api/v1/users/logout
// @access  Private
// const getUserProfile = async(req,res) => {
//     res.status(200).json({msg: 'User Profile'})
// }


const getUserProfile = async (req, res) => {
    // Fetch user profile data (replace with actual logic)
    const userId = req.user.id; // Assuming you have authentication middleware
    const user = await User.findById(userId);
    console.log(user);
    res.status(200).json(user);
  };
  
  // @desc    Update user profile
  // route    PUT /api/v1/users/profile
  // @access  Private
  const updateUserProfile = async (req, res) => {
    // Update user profile data (replace with actual logic)
    const userId = req.user._id; // Assuming you have authentication middleware
    
    const updatedUserData = req.body; // Updated user data
    const updatedField = {}

    if(updatedUserData.name){
        updatedUserData.name = updatedField.name
    }

    if(updatedUserData.email){
        updatedUserData.email = updatedField.email
    }
    await User.findByIdAndUpdate(userId, updatedField, {new: true});
    res.status(200).json(updatedUserData);
  };
//   const updateUserProfile = async(req,res) => {
//     res.status(200).json({msg: 'Update User Profile'})
// }


const loginCtrl = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    try {
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        } else {
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                // Generate a JWT token
                const token = generateToken(user._id);

                // Send the token in the response
                res.json({ msg: 'Success', token, user });
            } else {
                return res.status(400).json({ msg: 'Invalid password' });
            }
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
};

module.exports = { registerCtrl, loginCtrl, logoutCtrl, updateUserProfile, getUserProfile }
