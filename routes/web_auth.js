const express = require("express");
const router = express.Router();
// const logout = require("express-passport-logout");
const passport = require("passport");
router.get("/login/success", (req, res) => {
  console.log("/login/success");
  console.log(req.user);

  if (req.user) {
    console.log("user is found");
    res.send({
      success: true,
      message: "Success",
      user: req.user,
    });
  } else {
    console.log("user is not found");

    res.status(404).json({
      error: true,
      message: "aa Authorized",
    });
  }
});
router.get("/login/failed", (req, res) => {
  console.log("/login/failed");

  res.status(401).json({
    error: true,
    message: "Log in Failure",
  });
});
// /auth/web/login/success
//   /auth/web/login/failed
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://t1-expert.vercel.app",
    failureRedirect: `${process.env.CLIENT_URL}/login/unApproved`,
  })
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    console.log("logout callback called there");

    if (err) {
      console.log("This is the logour err", err);
    }
    res.redirect("https://t1-expert.vercel.app");
  });
});
module.exports = router;
