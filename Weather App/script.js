async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "714c969a02b40c19bb551fc38f108d83"; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '<p>Loading...</p>'; //Show loading message

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        console.error("Error fetching weather data:", error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><i id="weatherIcon" class="wi wi-owm-${data.weather[0].id}"></i></p> 
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}