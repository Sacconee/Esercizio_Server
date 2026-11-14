// Gestione homepage: Welcome GIF e visualizzazione JSON dati utente loggato
async function setupHomePage() {
    const welcomeContent = document.getElementById("welcome-content");
    const toggleBtn = document.getElementById("toggle-user-data-btn");
    const userDataBox = document.getElementById("user-data-box");
    const jsonCode = document.getElementById("user-data-json");
    const heroTitle = document.getElementById("hero-title");
    const copyBtn = document.getElementById("copy-json-btn");

    if (!welcomeContent) return;

    // Se l'URL indica logout, svuota subito
    const params = new URLSearchParams(window.location.search);
    if (params.get("logout") === "true") {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("googleUser");
        welcomeContent.style.display = "none";
        if (heroTitle) heroTitle.textContent = "Benvenuto";
        return;
    }

    // Recupera l'utente loggato verificando con il backend
    async function fetchLoggedUser() {
        try {
            const res = await fetch("/api/v1/auth/me", { cache: "no-store" });
            if (res.ok) {
                const data = await res.json();
                if (data.authenticated) {
                    const user = data.user || { firstName: data.firstName || "utente" };
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    return user;
                } else {
                    // Backend dichiara non autenticato: ripulisce storage locale
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("googleUser");
                    return null;
                }
            }
        } catch (e) {
            console.warn("Impossibile contattare l'endpoint /api/v1/auth/me:", e);
        }

        // Se offline o backend irraggiungibile, controlla lo storage locale
        try {
            const stored = localStorage.getItem("currentUser") || localStorage.getItem("googleUser");
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (_) {}

        return null;
    }

    const currentUserData = await fetchLoggedUser();

    if (!currentUserData) {
        welcomeContent.style.display = "none";
        if (heroTitle) heroTitle.textContent = "Benvenuto";
        return;
    }

    // Se è loggato, mostra la welcome GIF
    welcomeContent.style.display = "flex";

    const displayName = currentUserData.firstName || currentUserData.displayName || "utente";
    if (heroTitle) {
        heroTitle.textContent = `Bentornato, ${displayName}!`;
    }

    // Prepara la visualizzazione del JSON con tutti i dati salvati
    const formattedJson = JSON.stringify(currentUserData, null, 2);
    if (jsonCode) {
        jsonCode.textContent = formattedJson;
    }

    // Toggle per mostrare / nascondere la casella del JSON
    if (toggleBtn && userDataBox) {
        toggleBtn.onclick = () => {
            const isHidden = userDataBox.style.display === "none" || !userDataBox.style.display;
            if (isHidden) {
                userDataBox.style.display = "block";
                toggleBtn.textContent = "Nascondi dati utente (JSON)";
                toggleBtn.classList.add("active");
            } else {
                userDataBox.style.display = "none";
                toggleBtn.textContent = "Mostra dati utente (JSON)";
                toggleBtn.classList.remove("active");
            }
        };
    }

    // Bottone copia negli appunti
    if (copyBtn && jsonCode) {
        copyBtn.onclick = async () => {
            try {
                await navigator.clipboard.writeText(formattedJson);
                const originalText = copyBtn.textContent;
                copyBtn.textContent = "Copiato!";
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            } catch (err) {
                console.warn("Errore durante la copia del JSON:", err);
            }
        };
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupHomePage);
} else {
    setupHomePage();
}
