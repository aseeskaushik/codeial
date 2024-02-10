const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

// tell passport to use a new strategy for google login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // find a user
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (user) {
            // if found set this user as req.user
            return done(null, user);
          } else {
            // if not found, create the user and set it as req.user
            User.create(
              {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString("hex"),
              },
              function (err, user) {
                if (err) {
                  console.log("error in creating user", err);
                  return;
                }

                return done(null, user);
              }
            );
          }
        })
        .catch((err) => {
          console.log("error in google-strategy-passport", err);
          return done(err);
        });
    }
  )
);

module.exports = passport;
