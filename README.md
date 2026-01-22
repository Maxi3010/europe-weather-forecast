# Europe Weather Forecast

A simple, elegant weather forecast application for European cities using the free 7Timer API. This project displays a 7-day weather forecast without requiring any API keys.

## Features

- ☀️ 7-day weather forecast for major European cities
- 🌍 No API key required - uses the free 7Timer API
- 📱 Responsive design that works on all devices
- ⚡ Fast and lightweight
- 🎨 Clean, modern user interface
- 🔄 Real-time weather data updates

## Supported Cities

- Paris, France
- Berlin, Germany
- Rome, Italy
- Madrid, Spain
- London, UK

## Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Logic and API integration
- **7Timer API** - Weather data source

## How It Works

1. Select a city from the available options
2. The app fetches weather data from the 7Timer API using the city's coordinates
3. Weather forecast is displayed for the next 7 days with temperature, weather conditions, and wind speed

## API Information

This project uses the [7Timer API](https://www.7timer.info/), a free numerical weather prediction service that doesn't require registration or API keys.

API Endpoint: `https://www.7timer.info/bin/api.pl?lon={longitude}&lat={latitude}&product=civil&output=json`

## Deployment

This project is designed to work seamlessly with GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the main branch as the source
4. Your site will be published at `https://{username}.github.io/{repository-name}`

## Local Development

Simply open `index.html` in your web browser. No build process or server required!

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License

This project is open source and available under the MIT License.