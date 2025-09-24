export async function handler(event) {
  const API_KEY = process.env.WEATHER_API_KEY; // Comes from Netlify environment variable
  const { city, lat, lon, type } = event.queryStringParameters;

  let url;

  // Decide which endpoint to use
  if (type === "coords" && lat && lon) {
    // By coordinates
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  } else if (type === "forecast" && city) {
    // Forecast by city
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  } else if (city) {
    // Current weather by city
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing city or coordinates" }),
    };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Failed to fetch weather data" }),
      };
    }
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
