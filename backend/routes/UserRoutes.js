const express = require('express')
const {registerCtrl, loginCtrl, updateUserProfile, logoutCtrl, getUserProfile} = require('../controller/Usercontroler')
const router = express.Router()

router.post("/register", registerCtrl)
router.post("/login", loginCtrl)
router.post("/logout", logoutCtrl)
router.route('/profile').get(getUserProfile).put(updateUserProfile)


module.exports = router

