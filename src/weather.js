
import { getCoordinates, getWeather } from "./api.js";

export async function showWeather(cityName) {
    try {
        const city = await getCoordinates(cityName);

        // Get the current weather
        const weather = await getWeather(
            city.latitude,
            city.longitude
        );
        console.log("\n===== IKIRERE WEATHER =====");
        console.log("City:", city.name);
        console.log("Country:", city.country);
        console.log("Temperature:", weather.temperature_2m, "°C");
        console.log("Humidity:", weather.relative_humidity_2m, "%");
        console.log("Wind Speed:", weather.wind_speed_10m, "km/h");
        console.log("===========================\n");

    } catch (error) {
        console.log("Error:", error.message);
        process.exitCode = 1;
    }
}
