// Weather API Configuration
// Using 7Timer API - a free weather API that doesn't require an API key
const WEATHER_API_BASE_URL = 'https://www.7timer.info/bin/api.pl';

// DOM Elements
const loadingElement = document.getElementById('loading');
const errorMessageElement = document.getElementById('errorMessage');
const forecastContainerElement = document.getElementById('forecastContainer');
const forecastGridElement = document.getElementById('forecastGrid');
const locationNameElement = document.getElementById('locationName');
const cityButtons = document.querySelectorAll('.city-btn');

/**
 * Fetches weather data from 7Timer API for given coordinates
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<Object>} Weather data object
 */
async function fetchWeatherData(latitude, longitude) {
    try {
        // Validate coordinates to prevent URL injection
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        
        if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
            throw new Error('Invalid coordinates provided');
        }
        
        // Construct the API URL with latitude, longitude, and required parameters
        // product=civil: Returns civil weather data (suitable for general public)
        // output=json: Returns data in JSON format
        const apiUrl = `${WEATHER_API_BASE_URL}?lon=${lon}&lat=${lat}&product=civil&output=json`;
        
        // Fetch weather data using async/await
        const response = await fetch(apiUrl);
        
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Validate that the response contains expected data
        if (!data || !data.dataseries) {
            throw new Error('Invalid response format from weather API');
        }
        
        return data;
    } catch (error) {
        // Handle network errors and other fetch failures
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

/**
 * Converts weather code from 7Timer API to weather description
 * @param {string} weatherCode - Weather code from API
 * @returns {string} Human-readable weather description
 */
function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
        'clear': 'Clear Sky',
        'pcloudy': 'Partly Cloudy',
        'mcloudy': 'Mostly Cloudy',
        'cloudy': 'Cloudy',
        'humid': 'Humid',
        'lightrain': 'Light Rain',
        'oshower': 'Occasional Showers',
        'ishower': 'Isolated Showers',
        'lightsnow': 'Light Snow',
        'rain': 'Rain',
        'snow': 'Snow',
        'rainsnow': 'Rain and Snow',
        'ts': 'Thunderstorm',
        'tsrain': 'Thunderstorm with Rain'
    };
    
    return weatherDescriptions[weatherCode] || 'Unknown';
}

/**
 * Converts weather code to appropriate emoji icon
 * @param {string} weatherCode - Weather code from API
 * @returns {string} Weather emoji
 */
function getWeatherIcon(weatherCode) {
    const weatherIcons = {
        'clear': '☀️',
        'pcloudy': '⛅',
        'mcloudy': '🌥️',
        'cloudy': '☁️',
        'humid': '🌫️',
        'lightrain': '🌦️',
        'oshower': '🌦️',
        'ishower': '🌧️',
        'lightsnow': '🌨️',
        'rain': '🌧️',
        'snow': '❄️',
        'rainsnow': '🌨️',
        'ts': '⛈️',
        'tsrain': '⛈️'
    };
    
    return weatherIcons[weatherCode] || '🌍';
}

/**
 * Formats date string for display
 * @param {number} dayOffset - Number of days from today
 * @returns {string} Formatted date string
 */
function formatDate(dayOffset) {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Displays weather forecast on the webpage
 * @param {Object} weatherData - Weather data from API
 * @param {string} cityName - Name of the selected city
 */
function displayWeatherForecast(weatherData, cityName) {
    // Clear previous forecast data
    forecastGridElement.innerHTML = '';
    
    // Update location name
    locationNameElement.textContent = `${cityName} - 7-Day Forecast`;
    
    // Get the first 7 days of forecast data (7Timer returns 8-day forecast, we'll use 7)
    const forecastDays = weatherData.dataseries.slice(0, 7);
    
    // Create forecast cards for each day
    forecastDays.forEach((day, index) => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        // Extract weather information
        const weatherCode = day.weather;
        const temperature = day.temp2m; // Temperature at 2 meters (in Celsius)
        // Wind speed - 7Timer API may structure wind data differently, so we handle multiple formats
        const windSpeed = day.wind10m?.speed || day.wind10m || 'N/A'; 
        const weatherDesc = getWeatherDescription(weatherCode);
        const weatherIcon = getWeatherIcon(weatherCode);
        const dateStr = formatDate(index);
        
        // Build card HTML
        card.innerHTML = `
            <div class="date">${dateStr}</div>
            <div class="weather-icon">${weatherIcon}</div>
            <div class="temperature">${temperature}°C</div>
            <div class="weather-description">${weatherDesc}</div>
            <div class="weather-details">
                <div class="detail-item">💨 Wind: ${windSpeed} km/h</div>
            </div>
        `;
        
        // Add card to the forecast grid
        forecastGridElement.appendChild(card);
    });
}

/**
 * Shows loading state
 */
function showLoading() {
    loadingElement.style.display = 'flex';
    errorMessageElement.style.display = 'none';
    forecastContainerElement.style.display = 'none';
}

/**
 * Shows error message
 */
function showError() {
    loadingElement.style.display = 'none';
    errorMessageElement.style.display = 'block';
    forecastContainerElement.style.display = 'none';
}

/**
 * Shows forecast data
 */
function showForecast() {
    loadingElement.style.display = 'none';
    errorMessageElement.style.display = 'none';
    forecastContainerElement.style.display = 'block';
}

/**
 * Handles city selection and fetches weather data
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {string} cityName - Name of the selected city
 */
async function handleCitySelection(latitude, longitude, cityName) {
    // Show loading state
    showLoading();
    
    try {
        // Fetch weather data
        const weatherData = await fetchWeatherData(latitude, longitude);
        
        // Display the forecast
        displayWeatherForecast(weatherData, cityName);
        
        // Show forecast container
        showForecast();
    } catch (error) {
        // Show error message if fetch fails
        console.error('Failed to load weather data:', error);
        showError();
    }
}

/**
 * Initializes event listeners for city buttons
 */
function initializeEventListeners() {
    cityButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Extract data attributes from button
            const latitude = parseFloat(button.dataset.lat);
            const longitude = parseFloat(button.dataset.lon);
            const cityName = button.textContent;
            
            // Fetch and display weather for selected city
            handleCitySelection(latitude, longitude, cityName);
        });
    });
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    
    // Load default city (Paris) on page load if city buttons exist
    if (cityButtons.length > 0) {
        const defaultButton = cityButtons[0];
        const latitude = parseFloat(defaultButton.dataset.lat);
        const longitude = parseFloat(defaultButton.dataset.lon);
        const cityName = defaultButton.textContent;
        handleCitySelection(latitude, longitude, cityName);
    }
});
