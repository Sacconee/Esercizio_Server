const passport = require("passport");
const config = require("./env");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { saveGoogleUser } = require("./db");

const googleClientId = config.GOOGLE_CLIENT_ID;
const googleClientSecret = config.GOOGLE_CLIENT_SECRET;
const googleConfigured = Boolean(googleClientId && googleClientSecret);

if (googleConfigured) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: `${config.AUTH_BASE_URL || "http://localhost:3500"}/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Salva o aggiorna l'utente su Atlas
          const user = await saveGoogleUser(profile);
          console.log(`✅ Utente salvato su MongoDB Atlas: ${user.email}`);
          return done(null, user);
        } catch (error) {
          console.error("Errore salvataggio utente su MongoDB:", error);
          const fallbackUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName:
              profile.name?.givenName ||
              profile.displayName?.split(" ")[0] ||
              "utente",
            email: profile.emails?.[0]?.value || "",
          };
          return done(null, fallbackUser);
        }
      }
    )
  );
} else {
  console.warn("Google OAuth non configurato: avvio in modalità locale senza autenticazione Google.");
}

// Salva e recupera l'utente nella sessione
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;