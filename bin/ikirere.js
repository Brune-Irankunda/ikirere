#!/usr/bin/env node
import { showWeather } from "../src/weather.js";
import { parseArgs } from "node:util";
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

if (values.help) {
    console.log("Welcome to Ikirere Weather CLI!");
    console.log("");
    console.log("Usage:");
    console.log("  ikirere weather <city>");
    console.log("");
    console.log("Options:");
    console.log("  -h, --help       Show help");
    console.log("  -v, --version    Show version");
}
else if (positionals[0] === "weather") {
    const city = positionals.slice(1).join(" ");

    if (!city) {
        console.log("Please provide a city name.");
        console.log("Example: npm start -- weather Kigali");
    } else {
        await showWeather(city);
    }
}

// Handle unknown commands
else {
    console.log("Unknown command:", positionals[0]);
}