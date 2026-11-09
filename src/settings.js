
import { readJSON, writeJSON } from "./storage.js";

// Default application settings
const defaultSettings = {
    temperatureUnit: "celsius",
    windSpeedUnit: "km/h",
    language: "en"
};

// Get application settings
export async function getSettings() {
    const savedSettings = await readJSON(
        "settings.json",
        defaultSettings
    );

    return {
        ...defaultSettings,
        ...savedSettings
    };
}

// Update application settings
export async function updateSettings(newSettings) {
    const currentSettings = await getSettings();

    const updatedSettings = {
        ...currentSettings,
        ...newSettings
    };

    await writeJSON("settings.json", updatedSettings);

    console.log("Settings updated successfully!");

    return updatedSettings;
}
