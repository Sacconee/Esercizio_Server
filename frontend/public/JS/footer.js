async function loadFooter() {
    const container = document.getElementById("footer");
    if (!container) return;

    if (container.querySelector(".footer")) return;

    try {
        let html = "";
        try {
            const res = await fetch("components/footer.html");
            if (res.ok) html = await res.text();
        } catch (_) {}

        if (!html) {
            const res = await fetch("/api/v1/components/footer.html");
            if (res.ok) html = await res.text();
        }

        if (html) {
            container.innerHTML = html;
        }
    } catch (err) {
        console.error("Errore nel caricamento del footer:", err);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadFooter);
} else {
    loadFooter();
}
