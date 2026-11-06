
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_DIR = fileURLToPath(new URL("../", import.meta.url));
const DATA_DIR = path.join(PROJECT_DIR, "data");

export async function readJSON(filename, defaultValue = []) {
    const filePath = path.join(DATA_DIR, filename);

    try {
        const data = await readFile(filePath, "utf-8");
        return JSON.parse(data);

    } catch (error) {
        if (error.code === "ENOENT") {
            return defaultValue;
        }

        throw error;
    }
}

export async function writeJSON(filename, data) {
    await mkdir(DATA_DIR, { recursive: true });

    const filePath = path.join(DATA_DIR, filename);

    await writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}

export async function addFavorite(city) {
    const favorites = await readJSON("favorites.json", []);

    const alreadyExists = favorites.some(
        favorite => favorite.toLowerCase() === city.toLowerCase()
    );

    if (alreadyExists) {
        console.log(city + " is already in your favourites.");
        return;
    }

    favorites.push(city);

    await writeJSON("favorites.json", favorites);

    console.log(city + " added to your favourites!");
}

export async function getFavorites() {
    return await readJSON("favorites.json", []);
}

export async function removeFavorite(city) {
    const favorites = await readJSON("favorites.json", []);

    const updatedFavorites = favorites.filter(
        favorite => favorite.toLowerCase() !== city.toLowerCase()
    );

    if (updatedFavorites.length === favorites.length) {
        console.log(city + " was not found in your favourites.");
        return;
    }

    await writeJSON("favorites.json", updatedFavorites);

    console.log(city + " removed from your favourites!");
}


export async function addHistory(city) {
    const history = await readJSON("history.json", []);

    history.push({
        city: city,
        searchedAt: new Date().toLocaleString()
    });

    await writeJSON("history.json", history);

    console.log("Search history saved.");
}

// Display search history
export async function getHistory() {
    return await readJSON("history.json", []);
}
