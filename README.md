# Europe Weather Forecast

A simple, elegant web application for checking real-time weather forecasts across major European cities.

## Features

- 🌍 Weather data for 20 major European cities
- 🌡️ Real-time temperature, humidity, and wind speed
- ☁️ Visual weather icons for different conditions
- 📱 Responsive design for mobile and desktop
- 🎨 Modern, gradient UI with smooth animations

## Cities Covered

The application provides weather information for the following European cities:

- London, United Kingdom
- Paris, France
- Berlin, Germany
- Madrid, Spain
- Rome, Italy
- Amsterdam, Netherlands
- Brussels, Belgium
- Vienna, Austria
- Prague, Czech Republic
- Warsaw, Poland
- Budapest, Hungary
- Stockholm, Sweden
- Copenhagen, Denmark
- Oslo, Norway
- Helsinki, Finland
- Athens, Greece
- Lisbon, Portugal
- Dublin, Ireland
- Zurich, Switzerland
- Barcelona, Spain

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- (Optional) A free API key from [OpenWeatherMap](https://openweathermap.org/api) for live weather data

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Maxi3010/europe-weather-forecast.git
   cd europe-weather-forecast
   ```

2. Open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser.

### Using with Live Weather Data

To get real-time weather data:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Open `main.js` and replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key';
   ```

**Note:** The application includes sample weather data for demonstration purposes when no API key is configured.

## Project Structure

```
europe-weather-forecast/
│
├─ index.html          # Main HTML file
├─ master.css          # Stylesheet for the application
├─ main.js             # JavaScript logic and API integration
├─ data/
│   └─ cities.js       # European city data with coordinates
├─ images/
│   └─ weather-icons/  # SVG weather icons
└─ README.md           # Project documentation
```

## Usage

1. Select a city from the dropdown menu
2. Click the "Get Weather" button
3. View the current weather information including:
   - Temperature (in Celsius)
   - Weather description
   - Humidity percentage
   - Wind speed (in km/h)

## Technologies Used

- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API (optional)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather icons designed as simple SVG graphics
- Weather data provided by [OpenWeatherMap](https://openweathermap.org/) (when configured)
- Gradient design inspiration from modern UI trends