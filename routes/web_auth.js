const express = require("express");
const router = express.Router();
const logout = require("express-passport-logout");
const passport = require("passport");
router.get("/login/success", (req, res) => {
  console.log("/login/success");
  if (req.user) {
    res.send({
      success: true,
      message: "Success",
      user: req.user,
    });
  } else {
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
    successRedirect: "http://localhost:3000/",
    failureRedirect: `${process.env.CLIENT_URL}/login/unApproved`,
  })
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/logout", (req, res) => {
  // res.logout();
  console.log("logout called there")

  res.clearCookie('connect.sid');
  res.clearCookie('Express session cookie2');
  req.logout(req.user,(err) => {
    console.log("logout callback called there")

    if (err) {
      console.log("This is the logour err", err);
    }
    req.session.destroy(function (err) { 
      // destroys the session
      console.log("destroy session callback called there")

      res.redirect("http://localhost:3000/");
		});    
  });
});
module.exports = router;
