
# Ikirere Weather CLI

Ikirere is a Node.js command-line weather application that allows users to check current weather conditions and seven-day forecasts for different cities.

## Features

- Search for weather by city name.
- Display current temperature.
- Display weather conditions such as sunny, cloudy and rainy.
- Display humidity and wind speed.
- View a seven-day weather forecast.
- Convert temperature between Celsius and Fahrenheit.
- Convert wind speed between km/h and mph.
- Add, list and remove favourite cities.
- Save and view search history.
- Store application settings.
- Save application data using JSON files.
- Automated tests using Node.js test runner.

## Technologies Used

- Node.js
- JavaScript
- Axios
- Open-Meteo Weather API
- JSON
- Node.js Test Runner

## Installation

Clone the repository:

    git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project folder:

    cd ikirere

Install dependencies:

    npm install

## Usage

Check current weather:

    npm start -- weather Kigali

Check seven-day forecast:

    npm start -- forecast Kigali

Add a favourite city:

    npm start -- favorites add Kigali

List favourite cities:

    npm start -- favorites list

Remove a favourite city:

    npm start -- favorites remove Kigali

View search history:

    npm start -- history

View settings:

    npm start -- settings

Change temperature unit:

    npm start -- settings set temperatureUnit fahrenheit

Change wind speed unit:

    npm start -- settings set windSpeedUnit mph

Display help:

    npm start -- --help

Display version:

    npm start -- --version

## Testing

Run automated tests:

    npm test


