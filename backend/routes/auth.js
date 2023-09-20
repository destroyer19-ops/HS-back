const express = require('express')
const router = express.Router()
const passport = require('passport')
router.get('/',
  passport.authenticate('facebook',{scope:['public_profile']}));

router.get('/', function(req,res){
    res.redirect('/')
})
router.get('/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173');
  });


  module.exports = router

