(function () {
    function getStoredUser() {
        try {
            const savedUser = localStorage.getItem("googleUser");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            return null;
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
