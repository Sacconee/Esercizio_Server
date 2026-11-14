const express = require('express');
const router = express.Router();
const passport = require('../../config/passport');
const config = require('../../config/env');

router.post("/login", (req, res, next) => {
  const { username, password, email } = req.body || {};

  if (!username) {
    return res.status(400).json({ error: "Username obbligatorio" });
  }

  const user = {
    googleId: `local-${username}`,
    displayName: username,
    firstName: username,
    email: email || `${username}@local.dev`,
  };

  const frontendBase = (config.FRONTEND_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '') + '/';

  req.login(user, (err) => {
    if (err) return next(err);

    const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");
    if (acceptsJson) {
      return res.json({ success: true, user });
    }

    const redirectUrl = `${frontendBase}?localUser=${encodeURIComponent(JSON.stringify(user))}`;
    return res.redirect(redirectUrl);
  });
});

router.get("/google", (req, res, next) => {
  if (!passport._strategy("google")) {
    return res.status(503).send(`
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
        <title>Google OAuth non configurato</title>
        <link rel="stylesheet" href="/api/v1/css/login.css">
        <style>
          body { display:flex; justify-content:center; align-items:center; min-height:100vh; font-family:Arial,sans-serif; background:#f4f6f8; margin:0; }
          .error-card { background:#fff; padding:32px; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.1); max-width:420px; text-align:center; }
          .error-card h2 { color:#d32f2f; margin-bottom:12px; font-size:22px; }
          .error-card p { color:#555; font-size:15px; line-height:1.5; margin-bottom:20px; }
          .back-btn { display:inline-block; padding:10px 20px; background:#0078ff; color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
          .back-btn:hover { background:#005fcc; }
        </style>
      </head>
      <body>
        <div class="error-card">
          <h2>Google OAuth non configurato</h2>
          <p>L'integrazione Google OAuth non è configurata o le credenziali nel file <code>.env</code> non sono corrette.</p>
          <a href="/api/v1/signin" class="back-btn">Torna a Sign In</a>
        </div>
      </body>
      </html>
    `);
  }

  return passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
});

router.get(
  "/google/callback",
  (req, res, next) => {
    const frontendBase = (config.FRONTEND_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '') + '/';

    if (!passport._strategy("google")) {
      return res.redirect(`${frontendBase}?error=oauth_unconfigured`);
    }

    return passport.authenticate("google", {
      failureRedirect: `${frontendBase}?error=auth_failed`,
    })(req, res, next);
  },
  (req, res) => {
    const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");

    if (acceptsJson) {
      return res.json(req.user);
    }

    const frontendBase = (config.FRONTEND_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '') + '/';
    const redirectUrl = `${frontendBase}?googleUser=${encodeURIComponent(JSON.stringify(req.user))}`;
    return res.redirect(redirectUrl);
  }
);

// Usata dalla navbar e dalla home: restituisce tutti i dati salvati dell'utente loggato
router.get("/me", (req, res) => {
  res.set("Cache-Control", "no-store");

  if (!req.isAuthenticated() || !req.user) {
    return res.json({ authenticated: false });
  }

  return res.json({
    authenticated: true,
    firstName: req.user.firstName || req.user.displayName || "utente",
    user: req.user,
  });
});

const handleLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" });
      const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");
      if (acceptsJson) {
        return res.json({ success: true, authenticated: false });
      }
      const frontendBase = (config.FRONTEND_URL || 'http://localhost:4000/api/v1').replace(/\/+$/, '') + '/';
      return res.redirect(`${frontendBase}?logout=true`);
    });
  });
};

router.get("/logout", handleLogout);
router.post("/logout", handleLogout);

module.exports = router;