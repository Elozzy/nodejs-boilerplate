const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { user } = require("../models");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.APP_TOKEN_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const authuser = await user.findByPk(jwt_payload.id);
        if (authuser === null) {
          return done(null, false);
        }
        if (authuser && authuser.isVerified) {
          return done(null, authuser);
        }
        return done(null, false);
      } catch (error) {
        return done(null, false);
      }
    })
  );
};
