const FacebookStrategy = require('passport-facebook')
const passport = require('passport')

const FACEBOOK_APP_ID='1013273196760878'
const FACEBOOK_APP_SECRET='5c7dfe0a15f002661cf4af476a7d2a4a'

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    done(null, profile)
  }
));
passport.serializeUser(function(user, done) {
    done(null,user)
})

passport.deserializeUser(function(user, done) {
    done(null,user)
})

