// API Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Users should replace this with their OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
let citySelect;
let weatherDisplay;
let cityName;
let temperature;
let weatherDescription;
let humidity;
let windSpeed;
let weatherIcon;
let errorMessage;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    populateCityDropdown();
    setupEventListeners();
});

// Initialize DOM element references
function initializeElements() {
    citySelect = document.getElementById('city-select');
    weatherDisplay = document.getElementById('weather-display');
    cityName = document.getElementById('city-name');
    temperature = document.getElementById('temperature');
    weatherDescription = document.getElementById('weather-description');
    humidity = document.getElementById('humidity');
    windSpeed = document.getElementById('wind-speed');
    weatherIcon = document.getElementById('weather-icon');
    errorMessage = document.getElementById('error-message');
}

// Populate the city dropdown with European cities
function populateCityDropdown() {
    if (!europeanCities || !citySelect) return;
    
    // Sort cities alphabetically by name
    const sortedCities = [...europeanCities].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedCities.forEach(city => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ lat: city.lat, lon: city.lon });
        option.textContent = `${city.name}, ${city.country}`;
        citySelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (citySelect) {
        citySelect.addEventListener('change', handleSearch);
    }
}

// Handle search button click
async function handleSearch() {
    if (!citySelect || !citySelect.value) {
        showError('Please select a city');
        return;
    }
    
    try {
        const cityData = JSON.parse(citySelect.value);
        await fetchWeatherData(cityData.lat, cityData.lon);
    } catch (error) {
        showError('Error parsing city data');
    }
}

// Fetch weather data from API
async function fetchWeatherData(lat, lon) {
    try {
        hideError();
        
        // For demo purposes, if API key is not set, show sample data
        if (API_KEY === 'YOUR_API_KEY_HERE') {
            displaySampleWeather();
            return;
        }
        
        const url = `${API_BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        showError(`Failed to fetch weather data: ${error.message}`);
    }
}

// Display weather data on the page
function displayWeatherData(data) {
    if (!data) return;
    
    // Update city name
    if (cityName) {
        cityName.textContent = data.name;
    }
    
    // Update temperature
    if (temperature) {
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
    }
    
    // Update weather description
    if (weatherDescription) {
        weatherDescription.textContent = capitalizeFirstLetter(data.weather[0].description);
    }
    
    // Update humidity
    if (humidity) {
        humidity.textContent = `${data.main.humidity}%`;
    }
    
    // Update wind speed
    if (windSpeed) {
        windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    }
    
    // Update weather icon
    if (weatherIcon) {
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `images/weather-icons/${getWeatherIconName(iconCode)}.svg`;
        weatherIcon.alt = data.weather[0].description;
    }
    
    // Show weather display
    if (weatherDisplay) {
        weatherDisplay.style.display = 'block';
    }
}

// Display sample weather data for demo
function displaySampleWeather() {
    const selectedCity = citySelect.options[citySelect.selectedIndex].text.split(',')[0];
    
    if (cityName) cityName.textContent = selectedCity;
    if (temperature) temperature.textContent = '18°C';
    if (weatherDescription) weatherDescription.textContent = 'Partly Cloudy';
    if (humidity) humidity.textContent = '65%';
    if (windSpeed) windSpeed.textContent = '15 km/h';
    
    if (weatherIcon) {
        weatherIcon.src = 'images/weather-icons/partly-cloudy.svg';
        weatherIcon.alt = 'Partly Cloudy';
    }
    
    if (weatherDisplay) {
        weatherDisplay.style.display = 'block';
    }
}

// Map weather icon codes to icon names
function getWeatherIconName(iconCode) {
    const iconMap = {
        '01d': 'clear-day',
        '01n': 'clear-night',
        '02d': 'partly-cloudy',
        '02n': 'partly-cloudy-night',
        '03d': 'cloudy',
        '03n': 'cloudy',
        '04d': 'cloudy',
        '04n': 'cloudy',
        '09d': 'rain',
        '09n': 'rain',
        '10d': 'rain',
        '10n': 'rain',
        '11d': 'thunderstorm',
        '11n': 'thunderstorm',
        '13d': 'snow',
        '13n': 'snow',
        '50d': 'fog',
        '50n': 'fog'
    };
    
    return iconMap[iconCode] || 'partly-cloudy';
}

// Utility function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show error message
function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    if (weatherDisplay) {
        weatherDisplay.style.display = 'none';
    }
}

// Hide error message
function hideError() {
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}
