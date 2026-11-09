
import { getCoordinates, getWeather, getForecast } from "./api.js";
import { getSettings } from "./settings.js";
import { getWeatherDescription } from "./weatherCodes.js";

// Display current weather
export async function showWeather(cityName) {
    try {
        const city = await getCoordinates(cityName);

        const weather = await getWeather(
            city.latitude,
            city.longitude
        );

        const settings = await getSettings();

        let temperature = weather.temperature_2m;
        let windSpeed = weather.wind_speed_10m;

        // Convert temperature to Fahrenheit
        if (settings.temperatureUnit === "fahrenheit") {
            temperature = (temperature * 9 / 5) + 32;
        }

        // Convert wind speed to miles per hour
        if (settings.windSpeedUnit === "mph") {
            windSpeed = windSpeed * 0.621371;
        }

        // Get weather description
        const description = getWeatherDescription(weather.weather_code);

        console.log("\n===== IKIRERE WEATHER =====");
        console.log("City:", city.name);
        console.log("Country:", city.country);
        console.log("Condition:", description);

        console.log(
            "Temperature:",
            temperature.toFixed(1),
            settings.temperatureUnit === "fahrenheit" ? "°F" : "°C"
        );

        console.log("Humidity:", weather.relative_humidity_2m, "%");

        console.log(
            "Wind Speed:",
            windSpeed.toFixed(1),
            settings.windSpeedUnit
        );

        console.log("===========================\n");

        return true;

    } catch (error) {
        console.log("Error:", error.message);
        process.exitCode = 1;
        return false;
    }
}

// Display a 7-day weather forecast
export async function showForecast(cityName) {
    try {
        const city = await getCoordinates(cityName);

        const forecast = await getForecast(
            city.latitude,
            city.longitude
        );

        const settings = await getSettings();

        console.log("\n===== IKIRERE 7-DAY FORECAST =====");
        console.log("City:", city.name);
        console.log("Country:", city.country);
        console.log("");

        for (let i = 0; i < forecast.time.length; i++) {
            let maxTemp = forecast.temperature_2m_max[i];
            let minTemp = forecast.temperature_2m_min[i];

            // Convert temperatures to Fahrenheit
            if (settings.temperatureUnit === "fahrenheit") {
                maxTemp = (maxTemp * 9 / 5) + 32;
                minTemp = (minTemp * 9 / 5) + 32;
            }

            console.log("Date:", forecast.time[i]);

            // Display weather description
            console.log(
                "Condition:",
                getWeatherDescription(forecast.weather_code[i])
            );

            console.log(
                "Maximum:",
                maxTemp.toFixed(1),
                settings.temperatureUnit === "fahrenheit" ? "°F" : "°C"
            );

            console.log(
                "Minimum:",
                minTemp.toFixed(1),
                settings.temperatureUnit === "fahrenheit" ? "°F" : "°C"
            );

            console.log(
                "Rain chance:",
                forecast.precipitation_probability_max[i] + "%"
            );

            console.log("-------------------------------");
        }

        console.log("=================================\n");

        return true;

    } catch (error) {
        console.log("Error:", error.message);
        process.exitCode = 1;
        return false;
    }
}
