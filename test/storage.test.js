
import { test } from "node:test";
import assert from "node:assert";

import {
    addFavorite,
    getFavorites,
    removeFavorite,
    addHistory,
    getHistory
} from "../src/storage.js";

// Test 1: Save a city to favourites
test("should save a city to favourites", async () => {
    await addFavorite("Kigali");

    const favorites = await getFavorites();

    assert.ok(favorites.includes("Kigali"));
});

// Test 2: Remove a city from favourites
test("should remove a city from favourites", async () => {
    await addFavorite("Nairobi");
    await removeFavorite("Nairobi");

    const favorites = await getFavorites();

    assert.ok(!favorites.includes("Nairobi"));
});

// Test 3: Save a city search in history
test("should save a city search in history", async () => {
    await addHistory("Test City");

    const history = await getHistory();

    assert.ok(
        history.some(item => item.city === "Test City")
    );
});
