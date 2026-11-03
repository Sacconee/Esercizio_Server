const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");

    if (acceptsJson) {
      return res.json(req.user);
    }

    const redirectUrl = `http://localhost:3000/?googleUser=${encodeURIComponent(JSON.stringify(req.user))}`;
    return res.redirect(redirectUrl);
  }
);
module.exports = router;