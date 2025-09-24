

document.getElementById('search').addEventListener('click',async() =>{
    const city = document.getElementById('city').value;
    console.log("City entered:", city);
    if(!city){
        alert("Please enter a city!");
        return;
    }
    try{
        // 1. Current Weather
        const res = await fetch(
           `/.netlify/functions/getWeather?city=${encodeURIComponent(city)}`
        );
        console.log("API Response Status:", res.status);
        if(!res.ok) throw new Error("city not found");
        const data = await res.json();
        console.log("API Data:", data);
        // Dynamic background based on weather

        const weatherType = data.weather[0].main.toLowerCase();
        let bgGradientDark, bgGradientLight;
        

switch(weatherType) {
    case "clear":
        bgGradientDark = "linear-gradient(135deg, #fceabb, #f8b500)";
        bgGradientLight = "linear-gradient(135deg, #fff8e7, #ffe27a)";
        break;
    case "clouds":
        bgGradientDark = "linear-gradient(135deg, #d7d2cc, #304352)";
        bgGradientLight = "linear-gradient(135deg, #e0e0e0, #c0c0c0)";
        break;
    case "rain":
    case "drizzle":
        bgGradientDark = "linear-gradient(135deg, #4e54c8, #8f94fb)";
        bgGradientLight = "linear-gradient(135deg, #cce0ff, #99c2ff)";
        break;
    case "thunderstorm":
        bgGradientDark = "linear-gradient(135deg, #373B44, #4286f4)";
        bgGradientLight = "linear-gradient(135deg, #d1d9ff, #a6bfff)";
        break;
    case "snow":
        bgGradientDark = "linear-gradient(135deg, #e6f0ff, #a3dfff)";
        bgGradientLight = "linear-gradient(135deg, #ffffff, #d0f0ff)";
        break;
    case "mist":
    case "fog":
        bgGradientDark = "linear-gradient(135deg, #757f9a, #d7dde8)";
        bgGradientLight = "linear-gradient(135deg, #f0f0f5, #d7dde8)";
        break;
    default:
        bgGradientDark = "linear-gradient(135deg, #1e3c72 , #2a5298)";
        bgGradientLight = "linear-gradient(135deg, #f4f7f6, #e4ebea)";
}

// Apply based on current theme
if (document.body.classList.contains("light")) {
    document.body.style.background = bgGradientLight;
} else {
    document.body.style.background = bgGradientDark;
}



        document.getElementById('output').innerHTML=`
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>${Math.round(data.main.temp)}°C</strong></p>
        <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
        <img src ="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        `;
        // 2. 5-Day forecast
        const forecastRes = await fetch(`/.netlify/functions/getWeather?city=${encodeURIComponent(city)}&type=forecast`);
        const forecastData = await forecastRes.json();
        //Extract temps at 12:00 each day 
        const labels =[];
        const temps = [];
        forecastData.list.forEach(entry=>{
            if(entry.dt_txt.includes("12:00:00")){
                labels.push(entry.dt_txt.split(" ")[0]);
                temps.push(entry.main.temp);
            }
        });
        //chart.js
        const ctx = document.getElementById('forecastChart').getContext('2d');
        console.log("Chart before destroy:", window.forecastChart);
        if(window.forecastChart instanceof Chart){
            window.forecastChart.destroy();//avoid duplicate charts
        }
        const textColor = document.body.classList.contains("light")?"black":"white";
        window.forecastChart = new Chart(ctx,{
            type: 'line',
            data:{
                labels:labels,
                datasets:[{
                    label: 'Temperature (°C)',
                    data: temps,
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255,152,0,0.3)',
                    fill: true,
                    tension: 0.4
                }]
            },
    
            options:{
                responsive: true,
                plugins:{legend:{labels:{color: textColor}}},
                scales:{
                    x:{ticks:{color: textColor}},
                    y:{ticks:{color: textColor}}
                }
            }
        });
        // Populate forecast cards
        const forecastCardsDiv = document.getElementById('forecastCards');
        forecastCardsDiv.innerHTML = ""; // clear previous

        forecastData.list.forEach(entry => {
        if (entry.dt_txt.includes("12:00:00")) {
             // pick noon for each day
            const weatherType = entry.weather[0].main.toLowerCase();
            const card = document.createElement("div");
            card.classList.add("forecast-card",weatherType);
            card.innerHTML = `
                <h4>${entry.dt_txt.split(" ")[0]}</h4>
                <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" alt="">
                <p><strong>${Math.round(entry.main.temp)}°C</strong></p>
                <p>${entry.weather[0].description}</p>
            `;
            forecastCardsDiv.appendChild(card);
            }
        });
        // save last searched city
        localStorage.setItem("lastCity",city);
    }catch(error){
        console.error("⚠️ Error:", error);
        document.getElementById('output').innerHTML =`<p style ="color:red">${error.message}</p>`;
    }
   
});

window.addEventListener("load",async()=>{
    const lastCity = localStorage.getItem("lastCity");
    if(lastCity){
        document.getElementById('city').value = lastCity;
        // trigger the same weather fetching logic
        document.getElementById('search').click();
    }
})
// Use my location button logic
document.getElementById('geoBtn').addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async (position) =>{
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            try{
                 // Current weather by coordinates
                const res = await fetch(
                    `/.netlify/functions/getWeather?lat=${lat}&lon=${lon}&type=coords`);
                if (!res.ok) throw new Error("Unable to fetch weather");
                const data = await res.json();

                // Fill input with detected city
                document.getElementById("city").value = data.name;

                // Trigger existing search logic
                document.getElementById("search").click();
            } catch (error) {
                console.error("⚠️ Geo Error:", error);
                alert("Could not fetch weather for your location.");
            }
        }, () => {
            alert("Location access denied!");
        });
    } else {
        alert("Geolocation not supported by your browser.");
            }
        });

const themeCheckbox = document.getElementById("themeCheckbox");
const modeLabel = document.querySelector(".mode-label");

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
    themeCheckbox.checked = true;
    modeLabel.textContent = "Dark Mode";
} else {
    document.body.classList.remove("light");
    themeCheckbox.checked = false;
    modeLabel.textContent = "Light Mode";
}

// Toggle theme on checkbox change
themeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        modeLabel.textContent = "Dark Mode";
    } else {
        localStorage.setItem("theme", "dark");
        modeLabel.textContent = "Light Mode";
    }
});
