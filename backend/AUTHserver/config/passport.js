const passport = require("passport");
const config = require("./env");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
        const user = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName:
            profile.name?.givenName ||
            profile.displayName?.split(" ")[0] ||
            "utente",
          email: profile.emails?.[0]?.value || "",
        };

        return done(null, user);
      }
    )
  );
} else {
  console.warn("Google OAuth non configurato: avvio in modalità locale senza autenticazione Google.");
}
//quando l'utente si autentica express-session di express genera una sessione,
//con il metodo serialize gli caccio dentro le info di user sopra
passport.serializeUser((user, done) => {
  done(null, user);
});
//deserializeUser() è il metodo che, partendo dall'id salvata nella sessione con serializeUser(), ricostruisce l'oggetto utente
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;