const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { city, lat, lon, forecast } = event.queryStringParameters || {};
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not found" })
    };
  }

  try {
    let url = "";

    if (forecast === "true") {
      // 5-day forecast
      if (city) url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      else if (lat && lon) url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      else return { statusCode: 400, body: JSON.stringify({ error: "No location provided" }) };
    } else {
      // Current weather
      if (city) url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      else if (lat && lon) url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      else return { statusCode: 400, body: JSON.stringify({ error: "No location provided" }) };
    }

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
