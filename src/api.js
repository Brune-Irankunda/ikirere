
import axios from "axios";

// Get the coordinates of a city
export async function getCoordinates(city) {
    if (!city || city.trim() === "") {
        throw new Error("Please enter a city name.");
    }

    try {
        const response = await axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            {
                params: {
                    name: city.trim(),
                    count: 1,
                    language: "en",
                    format: "json"
                },
                timeout: 10000
            }
        );

        const location = response.data.results?.[0];

        if (!location) {
            throw new Error("City not found. Please check the name.");
        }

        return {
            name: location.name,
            country: location.country,
            latitude: location.latitude,
            longitude: location.longitude
        };

    } catch (error) {
        if (error.message.includes("City not found")) {
            throw error;
        }

        if (error.code === "ECONNABORTED") {
            throw new Error("Request timed out. Please try again.");
        }

        throw new Error("Unable to connect to the location service.");
    }
}

// Get current weather
export async function getWeather(latitude, longitude) {
    try {
        const response = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude,
                    longitude,
                    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
                    timezone: "auto"
                },
                timeout: 10000
            }
        );

        return response.data.current;

    } catch (error) {
        if (error.code === "ECONNABORTED") {
            throw new Error("Weather request timed out. Please try again.");
        }

        throw new Error("Unable to get weather information.");
    }
}

// Get a 7-day weather forecast
export async function getForecast(latitude, longitude) {
    try {
        const response = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude,
                    longitude,
                    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
                    timezone: "auto",
                    forecast_days: 7
                },
                timeout: 10000
            }
        );

        return response.data.daily;

    } catch (error) {
        if (error.code === "ECONNABORTED") {
            throw new Error("Forecast request timed out. Please try again.");
        }

        throw new Error("Unable to get weather forecast.");
    }
}
