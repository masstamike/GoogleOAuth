var express   = require('express');
var router    = express.Router();
var passport  = require('passport');
var secrets   = require('../secrets.json');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

var GOOGLE_CLIENT_ID      = secrets.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET  = secrets.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    console.log(profile.id);
    console.log(profile.name);
    console.log(profile.displayName);
    console.log(profile.birthday);
    console.log(profile.relationship);
    console.log(profile.isPerson);
    console.log(profile.isPlusUser);
    console.log(profile.placesLived);
    console.log(profile.language);
    console.log(profile.emails);
    console.log(profile.gender);
    done(undefined, {googleId: profile.id});
  }
));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
  ));

router.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  }));

router.get('/auth/google/success', function(req, res, next) {
    res.send("success");
  });

router.get('/auth/google/failure', function(req, res, next) {
  res.send("failure");
});

module.exports = router;
