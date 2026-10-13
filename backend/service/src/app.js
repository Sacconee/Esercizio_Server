//il suo unico compito quando il sistema è strutturato bene è:

const express = require('express');
const bodyParser = require('body-parser');
const path = require("path"); //non richiede installazione perche pre...
require("dotenv").config(); //da aggiungere per il .nev
// importazione delle routes
const pagesRoutes = require("./routes/pageroutes"); //gestita come lib...
const authRoutes = require("./routes/authroutes"); ////gestita come libr...
const weatherRoutes = require("./routes/weatherroutes"); //gestita come libreria esterna

const app = express();
const port = 3000;


// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../../frontend/public")));

//gestione delle routes
app.use("/", pagesRoutes);
app.use("/", authRoutes);
app.use("/", weatherRoutes);

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});