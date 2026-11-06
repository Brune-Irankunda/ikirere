

import { parseArgs } from "node:util";
import { showWeather } from "../src/weather.js";
import { addFavorite, getFavorites } from "../src/storage.js";

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
    console.log("");
    console.log("Examples:");
    console.log("  npm start -- weather Kigali");
    console.log("  npm start -- weather Nairobi");
    console.log("");
    console.log("Options:");
    console.log("  -h, --help       Show help");
    console.log("  -v, --version    Show version");
}

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
    } else {
        console.log("Usage:");
        console.log("  npm start -- favorites add Kigali");
        console.log("  npm start -- favorites list");
    }
}