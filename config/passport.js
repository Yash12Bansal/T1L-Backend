const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
console.log("dfdfdfd" + process.env.CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/web/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);

      // const user = {
      //   username: profile.displayName,
      //   avatar: profile.photos[0],
      // };
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
