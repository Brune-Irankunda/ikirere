
import axios from "axios";

export async function getCoordinates(city) {
    // Check if the city name is empty
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

export async function getWeather(latitude, longitude) {
    try {
        const response = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    current: "temperature_2m,relative_humidity_2m,wind_speed_10m",
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
