const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const config = require('../../config/env');

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: config.FRONTEND_URL,
  }),
  (req, res) => {
    const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");

    if (acceptsJson) {
      return res.json(req.user);
    }

    const redirectUrl = `${config.FRONTEND_URL}?googleUser=${encodeURIComponent(JSON.stringify(req.user))}`;
    return res.redirect(redirectUrl);
  }
);

// Usata dalla navbar: restituisce solo ciò che serve all'interfaccia
router.get("/me", (req, res) => {

    /*if (!req.user) {
        return res.json({
            authenticated: false
        });
    }*/
    // risposta dipendente dalla sessione: mai in cache
    res.set("Cache-Control", "no-store");

    if (!req.isAuthenticated()) {//json non autenticato
        return res.json({ authenticated: false });
    }
    res.json({//json autenticato
        authenticated: true,
        //firstName: req.user.displayName.split(" ")[0] //restituzione di bool e nome
        firstName: req.user.firstName,
    });

});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.redirect(config.FRONTEND_URL);
        });
    });
});

module.exports = router;