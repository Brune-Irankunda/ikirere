
import { parseArgs } from "node:util";
import { showWeather, showForecast } from "../src/weather.js";

import {
    addFavorite,
    getFavorites,
    removeFavorite,
    addHistory,
    getHistory
} from "../src/storage.js";

import {
    getSettings,
    updateSettings
} from "../src/settings.js";

// Get commands from the terminal
const { values, positionals } = parseArgs({
    options: {
        help: {
            type: "boolean",
            short: "h"
        },
        version: {
            type: "boolean",
            short: "v"
        }
    },
    allowPositionals: true
});

// Display help information
if (values.help) {
    console.log("Welcome to Ikirere Weather CLI!");
    console.log("");
    console.log("Usage:");
    console.log("  npm start -- weather <city>");
    console.log("  npm start -- forecast <city>");
    console.log("  npm start -- favorites add <city>");
    console.log("  npm start -- favorites list");
    console.log("  npm start -- favorites remove <city>");
    console.log("  npm start -- history");
    console.log("  npm start -- settings");
    console.log("  npm start -- settings set temperatureUnit fahrenheit");
    console.log("  npm start -- settings set windSpeedUnit mph");
    console.log("");
    console.log("Options:");
    console.log("  -h, --help       Show help");
    console.log("  -v, --version    Show version");
}

// Display application version
else if (values.version) {
    console.log("Ikirere version 1.0.0");
}

// Check if a command was provided
else if (positionals.length === 0) {
    console.error("Error: Please provide a command.");
    process.exitCode = 1;
}

// Handle weather command
else if (positionals[0] === "weather") {
    const city = positionals.slice(1).join(" ");

    if (!city) {
        console.error("Error: Please provide a city name.");
        console.error("Example: npm start -- weather Kigali");
        process.exitCode = 1;
    } else {
        const success = await showWeather(city);

        // Save only successful weather searches
        if (success) {
            await addHistory(city);
        }
    }
}

// Handle forecast command
else if (positionals[0] === "forecast") {
    const city = positionals.slice(1).join(" ");

    if (!city) {
        console.error("Error: Please provide a city name.");
        console.error("Example: npm start -- forecast Kigali");
        process.exitCode = 1;
    } else {
        await showForecast(city);
    }
}

// Handle favourites command
else if (positionals[0] === "favorites") {
    const action = positionals[1];
    const city = positionals.slice(2).join(" ");

    if (action === "add" && city) {
        await addFavorite(city);

    } else if (action === "list") {
        const favorites = await getFavorites();

        if (favorites.length === 0) {
            console.log("You have no saved favourite cities.");
        } else {
            console.log("Your favourite cities:");

            favorites.forEach((favorite, index) => {
                console.log(`${index + 1}. ${favorite}`);
            });
        }

    } else if (action === "remove" && city) {
        await removeFavorite(city);

    } else {
        console.log("Usage:");
        console.log("  npm start -- favorites add Kigali");
        console.log("  npm start -- favorites list");
        console.log("  npm start -- favorites remove Kigali");
        process.exitCode = 1;
    }
}

// Handle history command
else if (positionals[0] === "history") {
    const history = await getHistory();

    if (history.length === 0) {
        console.log("No search history found.");
    } else {
        console.log("Your search history:");

        history.forEach((item, index) => {
            console.log(`${index + 1}. ${item.city} - ${item.searchedAt}`);
        });
    }
}

// Handle settings command
else if (positionals[0] === "settings") {
    const action = positionals[1];
    const settingName = positionals[2];
    const settingValue = positionals[3];

    if (!action) {
        const settings = await getSettings();

        console.log("\nYour application settings:");
        console.log(settings);
    }

    else if (action === "set" && settingName && settingValue) {
        const allowedSettings = {
            temperatureUnit: ["celsius", "fahrenheit"],
            windSpeedUnit: ["km/h", "mph"],
            language: ["en"]
        };

        if (
            !allowedSettings[settingName] ||
            !allowedSettings[settingName].includes(settingValue)
        ) {
            console.log("Invalid setting or value.");
            console.log("Temperature: celsius or fahrenheit");
            console.log("Wind speed: km/h or mph");
            console.log("Language: en");
            process.exitCode = 1;
        } else {
            await updateSettings({
                [settingName]: settingValue
            });
        }
    }

    else {
        console.log("Usage:");
        console.log("  npm start -- settings");
        console.log("  npm start -- settings set temperatureUnit fahrenheit");
        console.log("  npm start -- settings set windSpeedUnit mph");
        process.exitCode = 1;
    }
}

// Handle unknown commands
else {
    console.error("Unknown command:", positionals[0]);
    process.exitCode = 1;
}
