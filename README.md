# Europe Weather Forecast

A simple and elegant web application that displays real-time weather information for major European cities.

## Features

- 🌍 Weather data for 10 major European cities
- 🌡️ Temperature in Celsius
- 💨 Wind speed information
- 💧 Humidity levels
- 🔄 Real-time data refresh
- 📱 Responsive design for mobile and desktop

## Project Structure

```
europe-weather-forecast/
│
├─ index.html          # Main HTML file
├─ master.css          # Stylesheet
├─ main.js            # Application logic
├─ data/
│   └─ cities.js      # European cities data
├─ images/
│   └─ weather-icons/ # Weather icon assets
└─ README.md          # Project documentation
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Maxi3010/europe-weather-forecast.git
   cd europe-weather-forecast
   ```

2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api):
   - Sign up for a free account
   - Generate an API key

3. Open `main.js` and replace `YOUR_API_KEY` with your actual API key:
   ```javascript
   this.apiKey = 'YOUR_ACTUAL_API_KEY_HERE';
   ```

4. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

5. Navigate to `http://localhost:8000` in your browser

## Cities Included

- London, United Kingdom
- Paris, France
- Berlin, Germany
- Madrid, Spain
- Rome, Italy
- Amsterdam, Netherlands
- Vienna, Austria
- Prague, Czech Republic
- Warsaw, Poland
- Brussels, Belgium

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- OpenWeatherMap API

## Usage

1. Select a city from the dropdown menu
2. View current weather information including:
   - Temperature
   - Weather description
   - Feels like temperature
   - Humidity
   - Wind speed
3. Click the refresh button to update the weather data

## API Reference

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data.

## License

MIT License - feel free to use this project for learning or personal use.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.