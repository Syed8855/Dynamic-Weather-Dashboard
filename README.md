####🌦 Weather Dashboard – Real-Time Dynamic Weather App

A modern, interactive weather dashboard built with HTML, CSS, and JavaScript, leveraging Netlify Functions for secure API access.
This project demonstrates full-stack frontend development, API integration, dynamic UI updates, and responsive design. It fetches real-time weather data from the OpenWeather API, including current conditions and a 5-day forecast, while keeping your API key secure.
---
###🔗 Live Demo

Experience the live app here:
https://dynamic-weather-dashboard88.netlify.app/
---
###📌 Features

The Weather Dashboard is designed for both functionality and user experience, offering:
1.City-Based Weather Search
    Search for any city worldwide.
    Displays current temperature, humidity, wind speed, and weather description.
2. Real-Time Location Weather
    “Use My Location” button fetches your current coordinates.
     Auto-populates city and updates weather data dynamically.
3. 5-Day Forecast
    Interactive line chart showing daily temperatures.
    Forecast cards display noon temperature, weather description, and icon.
4. Dynamic Backgrounds
    Background gradients change based on weather type (Clear, Clouds, Rain, Snow, Thunderstorm, Mist/Fog).
    Creates an immersive visual experience aligned with real-time weather.
5. Theme Toggle
    Switch between Light and Dark Mode.
    Theme selection persists across sessions using localStorage.
6. Persistent Last Search
    Saves the last searched city in localStorage.
    Automatically fetches weather for that city on page reload.
7. Secure API Integration
    API key is never exposed in frontend code.
    Uses Netlify serverless functions to securely fetch weather data.
8. Responsive Design
    Fully functional on desktop, tablet, and mobile screens.
    Forecast cards, charts, and main content adjust fluidly.
###💻 Technologies Used 
  Frontend: HTML5, CSS3, JavaScript (ES6+)
  Data Visualization: Chart.js for the forecast graph
  Backend / API Security: Netlify Functions
  Weather API: OpenWeather API
  Version Control: Git & GitHub
  Hosting: Netlify
---
###📁 Project Structure
  project-root/
├── index.html           # Main HTML file
├── script.js            # Core JavaScript logic
├── style.css            # Styling for the dashboard
└── netlify/
    └── functions/
        └── getWeather.js 
---        
###📈 Usage Instructions
1. Searching for a City
  Enter the city name in the search box.
  Click Search → current weather, forecast chart, and cards update.
2 .Using Current Location
  Click “Use My Location” → allow browser location access.
  Weather data automatically updates for your coordinates.
3.Theme Management
  Toggle Light/Dark mode using the checkbox.
  Selection is saved and persists across page reloads.
4.Forecast
  Forecast chart shows 5-day temperature trends.
  Forecast cards display daily weather, icons, and temperatures at noon.
---
###📫 Author
  Syed Hasnain
  GitHub: https://github.com/Syed8855
  Project inspired by modern frontend development and API integration best practices.
---
###🏆 Future Enhancements
  Add additional weather details (UV index, sunrise/sunset, pressure).
  Include multi-language support for international users.
  Add weather alerts for severe conditions.
  Improve chart interactivity with tooltips for each day.
  Add unit conversion (°C ↔ °F) for user preference





