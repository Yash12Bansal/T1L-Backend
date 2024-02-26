const express = require("express");
const router = express.Router();

const passport = require("passport");
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Success",
      user: req.user,
    });
  } else {
    res.status(404).json({
      error: true,
      message: "chal ninakl Not Authorized",
    });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in Failure",
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});
module.exports = router;
