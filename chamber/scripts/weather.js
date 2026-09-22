const apiKey = "bbc76749331ec92145881aa77e7657aa";

const latitude = 40.39;
const longitude = -111.85;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    document.querySelector("#temperature").textContent =
        Math.round(data.main.temp);

    document.querySelector("#description").textContent =
        data.weather[0].description;

    document.querySelector("#high").textContent =
        Math.round(data.main.temp_max);

    document.querySelector("#low").textContent =
        Math.round(data.main.temp_min);

    document.querySelector("#humidity").textContent =
        data.main.humidity;

    document.querySelector("#today-temp").textContent =
        Math.round(data.main.temp);
    }

async function getForecast() {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    // Get tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get the day after tomorrow
    const dayThree = new Date();
    dayThree.setDate(dayThree.getDate() + 2);

    // Convert dates to YYYY-MM-DD
    const tomorrowDate =
        tomorrow.toISOString().split("T")[0];

    const dayThreeDate =
        dayThree.toISOString().split("T")[0];

    // Find the noon forecast for tomorrow
    const tomorrowForecast = data.list.find(item =>
        item.dt_txt.includes(`${tomorrowDate} 12:00:00`)
    );

    // Find the noon forecast for day three
    const dayThreeForecast = data.list.find(item =>
        item.dt_txt.includes(`${dayThreeDate} 12:00:00`)
    );

    // Display tomorrow's temperature
    if (tomorrowForecast) {
        document.querySelector("#tomorrow-temp").textContent =
            Math.round(tomorrowForecast.main.temp);
    }

    // Display day three's temperature
    if (dayThreeForecast) {
        document.querySelector("#day-three-temp").textContent =
            Math.round(dayThreeForecast.main.temp);
    }

    // Get the actual weekday name
    const dayThreeName =
        dayThree.toLocaleDateString("en-US", {
            weekday: "long"
        });

    document.querySelector("#day-three-name").textContent =
        dayThreeName;
}


getForecast();
getWeather();
