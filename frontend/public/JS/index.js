async function loadWelcomeGif() {
  try {
    const response = await fetch("/api/v1/auth/me");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const user = await response.json();
    console.log("Risposta API auth:", user); // Utile per verificare la risposta in F12

    // Se la tua API restituisce i dati utente direttamente quando autenticato,
    // adatta questa condizione (es. user && user.id oppure user.authenticated)
    if (!user || user.authenticated === false) {
      return;
    }

    const welcomeContent = document.getElementById("welcome-content");

    if (!welcomeContent) {
      return;
    }

    const box = document.createElement("div");
    box.className = "welcome-box";

    const img = document.createElement("img");
    img.src = "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cnYwMXUzd2FuenV4MWdoMzM2dWlsams0bTFkYXJ4Z2VoZjY1ZWd2YyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/rjkJD1v80CjYs/giphy.gif";
    img.alt = "Welcome Gif";

    box.appendChild(img);
    welcomeContent.appendChild(box);
  } catch (err) {
    console.error("Errore durante il caricamento della GIF:", err);
  }
}

// Esegue la funzione sia se il DOM è ancora in caricamento sia se è già pronto
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", loadWelcomeGif);
} else {
  loadWelcomeGif();
}


