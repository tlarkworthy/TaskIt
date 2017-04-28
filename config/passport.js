const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../db/mongo').User;
const passport = require('passport')

module.exports = function(passpower){
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = 'supersecret';

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

      User.findOne({id: jwt_payload._id}, function(err, user) {
      console.log(jwt_payload);
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
              // or you could create a new account 
          }
      });
  }));
}
