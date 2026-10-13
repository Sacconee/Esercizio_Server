document.getElementById("weather-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = document.getElementById("city-input").value;
    
    const res = await fetch("/weather" , { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ city })
    });

    const data = await res.json();

    document.getElementById("weather-result").innerHTML = `
          <div class="weather-response-box">
                <p>${data.city}</p>
                <p>${data.description}</p>
                <p>Temperatura: ${data.temperature} °C</p>
                <p>Umidità: ${data.humidity} %</p>
                <img src="http://openweathermap.org/img/wn/${data.icon}.png" alt="Weather Icon">
          </div>
    `;

 
    document.getElementById("weather-result").style.display = "block";
});
