// Gestione navbar e stato autenticazione utente
(function () {
    // 1. Parsing parametri utente o logout da URL
    function checkUrlForUser() {
        try {
            const params = new URLSearchParams(window.location.search);

            if (params.get("logout") === "true") {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("googleUser");
                const cleanUrl = window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
                return null;
            }

            const encodedGoogleUser = params.get("googleUser");
            const encodedLocalUser = params.get("localUser");
            const rawUser = encodedGoogleUser || encodedLocalUser;

            if (rawUser) {
                const user = JSON.parse(decodeURIComponent(rawUser));
                if (user) {
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    const cleanUrl = window.location.pathname;
                    window.history.replaceState({}, document.title, cleanUrl);
                    return user;
                }
            }
        } catch (e) {
            console.warn("Impossibile leggere parametri URL:", e);
        }
        return null;
    }

    function getStoredUser() {
        try {
            const stored = localStorage.getItem("currentUser") || localStorage.getItem("googleUser");
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    // 2. Aggiorna l'interfaccia della navbar in base allo stato di login
    function renderNavbarAuth(user, isAuthenticated) {
        const welcomeEl = document.getElementById("nav-welcome") || document.querySelector(".nav-welcome");
        const logoutItem = document.getElementById("nav-logout-item");
        const signinItem = document.getElementById("nav-signin-item");

        if (isAuthenticated && user) {
            const displayName = user.firstName || user.displayName || "utente";
            if (welcomeEl) {
                welcomeEl.textContent = `Ciao, ${displayName}!`;
            }
            if (logoutItem) {
                logoutItem.style.display = "block";
            }
            if (signinItem) {
                signinItem.style.display = "none";
            }
        } else {
            if (welcomeEl) {
                welcomeEl.textContent = "Benvenuto!";
            }
            if (logoutItem) {
                logoutItem.style.display = "none";
            }
            if (signinItem) {
                signinItem.style.display = "block";
            }
        }
    }

    // 3. Verifica sessione con il backend
    async function updateAuthState() {
        const urlUser = checkUrlForUser();
        let activeUser = urlUser || getStoredUser();

        try {
            const res = await fetch("/api/v1/auth/me", { cache: "no-store" });
            if (res.ok) {
                const data = await res.json();
                if (data.authenticated) {
                    activeUser = data.user || activeUser || { firstName: data.firstName || "utente" };
                    localStorage.setItem("currentUser", JSON.stringify(activeUser));
                    renderNavbarAuth(activeUser, true);
                    return { authenticated: true, user: activeUser };
                } else {
                    // Backend dichiara non autenticato: rimuove sessione locale
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("googleUser");
                    renderNavbarAuth(null, false);
                    return { authenticated: false, user: null };
                }
            }
        } catch (err) {
            console.warn("Verifica sessione backend non riuscita:", err);
        }

        if (activeUser) {
            renderNavbarAuth(activeUser, true);
            return { authenticated: true, user: activeUser };
        } else {
            renderNavbarAuth(null, false);
            return { authenticated: false, user: null };
        }
    }

    // 4. Carica l'HTML della navbar se non è già presente nel DOM
    async function initNavbar() {
        const container = document.getElementById("navbar");
        if (!container) return;

        if (!container.querySelector(".navbar")) {
            try {
                let html = "";
                try {
                    const res = await fetch("/api/v1/components/navbar.html");
                    if (res.ok) html = await res.text();
                } catch (_) {}

                if (!html) {
                    const res = await fetch("components/navbar.html");
                    if (res.ok) html = await res.text();
                }

                if (html) {
                    container.innerHTML = html;
                }
            } catch (err) {
                console.error("Errore nel caricamento del componente navbar:", err);
            }
        }

        // Listener sul tasto Logout
        const logoutBtn = document.getElementById("nav-logout-btn");
        if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
            logoutBtn.dataset.listenerAttached = "true";
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("googleUser");
            });
        }

        await updateAuthState();
    }

    window.initializeNavbar = initNavbar;
    window.loadNavbar = initNavbar;
    window.getCurrentUser = getStoredUser;
    window.updateAuthState = updateAuthState;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNavbar);
    } else {
        initNavbar();
    }
})();
