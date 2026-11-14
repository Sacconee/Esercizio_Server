document.getElementById("weather-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = document.getElementById("city-input").value;
    const resultEl = document.getElementById("weather-result");
    
    resultEl.innerHTML = `<div class="weather-response-box"><p>Caricamento dati meteo...</p></div>`;
    resultEl.style.display = "block";

    try {
        const res = await fetch("/api/v1/weather", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city })
        });

        const data = await res.json();

        if (data.error) {
            resultEl.innerHTML = `
                <div class="weather-response-box" style="border-left: 4px solid #e53935;">
                    <p style="color: #c62828; font-weight: bold;">${data.message || "Impossibile recuperare i dati meteo."}</p>
                </div>
            `;
            return;
        }

        resultEl.innerHTML = `
            <div class="weather-response-box">
                <h3 style="margin-bottom: 8px; color: #1e293b;">${data.city}</h3>
                <p style="text-transform: capitalize; margin-bottom: 6px;">${data.description}</p>
                <p>Temperatura: <strong>${data.temperature} °C</strong></p>
                <p>Umidità: <strong>${data.humidity} %</strong></p>
                ${data.wind !== undefined ? `<p>Vento: <strong>${data.wind} m/s</strong></p>` : ""}
                ${data.icon ? `<img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather Icon" class="weather-icon">` : ""}
            </div>
        `;
    } catch (err) {
        resultEl.innerHTML = `
            <div class="weather-response-box" style="border-left: 4px solid #e53935;">
                <p style="color: #c62828;">Errore di connessione al server meteo.</p>
            </div>
        `;
    }
});
