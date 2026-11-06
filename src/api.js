
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

        // Check if the city was found
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
