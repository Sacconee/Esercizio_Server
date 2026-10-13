//mi permette di eliminare tutti i percorsi relativi -> gestisce i percorsi assoluti del progetto[cite: 10]

const path = require("path");

// Directory ROOT del servizio[cite: 10]
const ROOT = path.join(__dirname, "..");
const FRONTEND_PUBLIC = path.join(ROOT, "..", "..", "frontend", "public");
// Percorsi principali[cite: 10]
module.exports = {
    ROOT,
    SRC: path.join(ROOT, "src"),
    //PUBLIC: path.join(ROOT, "public"),
    PUBLIC: FRONTEND_PUBLIC,
    ROUTES: path.join(ROOT, "src", "routes"),
    CONTROLLERS: path.join(ROOT, "src", "controllers"),
    UTILS: path.join(ROOT, "src", "utils")
};