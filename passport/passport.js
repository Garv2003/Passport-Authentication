const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const passport = require("passport");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      let user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return done(err);
        }
        if (result) {
          return done(null, user);
        }
        return done(null, false);
      });
    } catch (err) {
      if (err) {
        return done(err);
      }
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    let user = await User.findById(id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
