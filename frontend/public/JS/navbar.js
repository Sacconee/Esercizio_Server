(function () {
    function getStoredUser() {
        try {
            const savedUser = localStorage.getItem("googleUser");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            return null;
        }
    }

    // Va incluso in ogni pagina al posto dello script inline che faceva fetch
// della navbar:
// nuovo DOM della navbar
async function loadNavbar() {
    const container = document.getElementById("navbar");
    // se la nav non c'è chiudi --> guard clause
    if (!container) return;

    // 1. Inserisce l'HTML della navbar --> caricamento dom
    const html = await (await fetch("/api/v1/components/navbar.html")).text();
    container.innerHTML = html;

    // 2. Chiede al backend chi è loggato
    const authArea = document.getElementById("auth-area");
    try {
        const response = await fetch("/api/v1/auth/me"); // endpoint standard google

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const user = await response.json();

        if (user.authenticated) {
            authArea.replaceChildren(); // quando autenticato toglie il contenuto "Login with google"

            // textContent (NON innerHTML): il nome arriva da Google ed è dato esterno,
            // con innerHTML sarebbe una possibile XSS
            const hello = document.createElement("span");
            hello.textContent = `Ciao ${user.firstName} `; // carico il welcome

            const logout = document.createElement("a"); // carico il link logout
            logout.href = "/api/v1/auth/logout";
            logout.textContent = "Logout";

            authArea.append(hello, logout);
        }
        // se non autenticato resta il link "Login With Google" già presente
    } catch (err) {
        // auth-service giù: la navbar resta in stato "non loggato"
        console.error("Impossibile verificare l'autenticazione:", err);
    }
}

    function persistUser(user) {
        try {
            localStorage.setItem("googleUser", JSON.stringify(user));
        } catch (error) {
            console.warn("Impossibile salvare l'utente Google:", error);
        }
    }

    function readUserFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const encodedUser = params.get("googleUser");

        if (!encodedUser) {
            return null;
        }

        try {
            const user = JSON.parse(decodeURIComponent(encodedUser));
            if (user && (user.displayName || user.name || user.email)) {
                persistUser(user);
                return user;
            }
        } catch (error) {
            console.warn("Parametro utente Google non valido:", error);
        }

        return null;
    }

    window.initializeNavbar = function () {
        const welcomeEl = document.querySelector(".nav-welcome");
        if (!welcomeEl) {
            return;
        }

        const storedUser = readUserFromUrl() || getStoredUser();
        const userName = storedUser?.displayName || storedUser?.name || "";

        welcomeEl.textContent = userName ? `Benvenuto, ${userName}!` : "Benvenuto!";
    };

    if (document.readyState !== "loading") {
        window.initializeNavbar();
    } else {
        document.addEventListener("DOMContentLoaded", window.initializeNavbar);
    }
})();
