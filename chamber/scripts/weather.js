const apiKey = "YOUR_API_KEY_HERE";

// Replace these coordinates with the Chamber's actual location.
const latitude = 37.13;
const longitude = -113.51;

const currentURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(currentURL);

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {
        console.error("Current weather error:", error);
    }
}

function displayCurrentWeather(data) {
    document.querySelector("#temperature").textContent =
        Math.round(data.main.temp);

    document.querySelector("#high").textContent =
        Math.round(data.main.temp_max);

    document.querySelector("#low").textContent =
        Math.round(data.main.temp_min);

    document.querySelector("#humidity").textContent =
        data.main.humidity;

    const description = data.weather[0].description;

    document.querySelector("#description").textContent =
        description
            .split(" ")
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");

    const icon = document.querySelector("#weather-icon");

    icon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    icon.alt = description;
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw Error(await response.text());
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {
        console.error("Forecast error:", error);
    }
}

function displayForecast(data) {

    // OpenWeatherMap provides forecasts every three hours.
    // Noon readings provide a simple daily forecast.
    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    if (dailyForecasts.length >= 3) {

        document.querySelector("#today-temp").textContent =
            Math.round(dailyForecasts[0].main.temp);

        document.querySelector("#tomorrow-temp").textContent =
            Math.round(dailyForecasts[1].main.temp);

        document.querySelector("#day-three-temp").textContent =
            Math.round(dailyForecasts[2].main.temp);

        const thirdDate =
            new Date(dailyForecasts[2].dt_txt);

        document.querySelector("#day-three-name").textContent =
            thirdDate.toLocaleDateString("en-US", {
                weekday: "long"
            });
    }
}

getWeather();
getForecast();