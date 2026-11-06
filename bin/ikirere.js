#!/usr/bin/env node

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

// Display help information
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

// Display application version
else if (values.version) {
    console.log("Ikirere version 1.0.0");
}

else if (positionals.length === 0) {
    console.log("Please provide a command.");
    console.log("Example: ikirere weather Kigali");
}

else {
    console.log("Command received:", positionals);
}
