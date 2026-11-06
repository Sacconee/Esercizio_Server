const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
const config = require('../config/env');
const paths = require('../config/paths');
const googleAuthRoutes = require(paths.ROUTES + '/authRoutes');
const session = require('express-session');
const passport = require('../config/passport');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: env.SESSION_SECRET, // non più hardcoded nel codice
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // il JS del browser non può leggere il cookie
      sameSite: "lax", // necessario per il ritorno da Google (navigazione top-lev...
      secure: env.NODE_ENV === "production", // solo HTTPS in produzione
      maxAge: 1000 * 60 * 60 * 8, // 8 ore
    },
    // NB: senza "store" usa MemoryStore, ok per sviluppo ma NON per produzione
    // (si svuota a ogni riavvio e non scala su più istanze: usare Redis o simili)
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', googleAuthRoutes); 

app.listen(config.AUTHSERVER_PORT, () => {
    console.log(`Service 2 (API) avviato su http://localhost:${config.AUTHSERVER_PORT}`);
});