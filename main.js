// Weather forecast application logic
class WeatherApp {
    constructor() {
        // NOTE: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        // Get a free API key at: https://openweathermap.org/api
        // This is intentionally a placeholder to prevent exposure of real API keys in source control
        this.apiKey = 'YOUR_API_KEY';
        this.currentCity = null;
        this.init();
    }

    init() {
        this.populateCityDropdown();
        this.setupEventListeners();
        // Load first city by default
        if (cities.length > 0) {
            this.loadWeather(cities[0]);
        }
    }

    populateCityDropdown() {
        const citySelect = document.getElementById('city-select');
        if (!citySelect) return;

        cities.forEach((city, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${city.name}, ${city.country}`;
            citySelect.appendChild(option);
        });
    }

    setupEventListeners() {
        const citySelect = document.getElementById('city-select');
        if (citySelect) {
            citySelect.addEventListener('change', (e) => {
                const cityIndex = e.target.value;
                this.loadWeather(cities[cityIndex]);
            });
        }

        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                if (this.currentCity) {
                    this.loadWeather(this.currentCity);
                }
            });
        }
    }

    async loadWeather(city) {
        this.currentCity = city;
        this.showLoading(true);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${this.apiKey}`
            );

            if (!response.ok) {
                throw new Error('Weather data not available');
            }

            const data = await response.json();
            this.displayWeather(data, city);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    displayWeather(data, city) {
        const weatherContainer = document.getElementById('weather-container');
        if (!weatherContainer) return;

        const temp = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind ? Math.round(data.wind.speed * 3.6) : 0; // Convert m/s to km/h
        const icon = data.weather[0].icon;

        weatherContainer.innerHTML = `
            <div class="weather-header">
                <h2>${city.name}, ${city.country}</h2>
                <p class="date">${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
            </div>
            <div class="weather-main">
                <img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="${description}" class="weather-icon">
                <div class="temperature">${temp}°C</div>
                <div class="description">${description}</div>
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <span class="detail-label">Feels like</span>
                    <span class="detail-value">${feelsLike}°C</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Humidity</span>
                    <span class="detail-value">${humidity}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Wind Speed</span>
                    <span class="detail-value">${windSpeed} km/h</span>
                </div>
            </div>
        `;

        weatherContainer.classList.remove('error');
    }

    showLoading(show) {
        const weatherContainer = document.getElementById('weather-container');
        if (!weatherContainer) return;

        if (show) {
            weatherContainer.innerHTML = '<div class="loading">Loading weather data...</div>';
        }
    }

    showError(message) {
        const weatherContainer = document.getElementById('weather-container');
        if (!weatherContainer) return;

        weatherContainer.innerHTML = `
            <div class="error-message">
                <p>⚠️ ${message}</p>
                <p>Please check your API key and try again.</p>
            </div>
        `;
        weatherContainer.classList.add('error');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
