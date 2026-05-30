// --- Navigation & Footer ---
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Toggle navigation menu
menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  if (navigation.classList.contains("open")) {
    menuButton.textContent = "✕";
  } else {
    menuButton.textContent = "☰";
  }
});

// copyright year and last modified date
const today = new Date();
if (currentYear) currentYear.textContent = today.getFullYear();
if (lastModified) lastModified.textContent = `Last Modification: ${document.lastModified}`;


// --- Weather API Integration ---
const lat = "22.28";
const lon = "-97.83";

const apiKey = "f4bc5ea49563ab20323797fbc9f4a400";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const tempField = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDesc = document.querySelector("#weather-desc");
const forecastContainer = document.querySelector("#forecast-container");

async function fetchWeather() {
  try {
    // 1. Fetch Current Weather
    const responseCurrent = await fetch(currentWeatherUrl);
    if (!responseCurrent.ok) throw new Error("Could not fetch current weather data.");
    const currentData = await responseCurrent.json();
    displayCurrentWeather(currentData);

    // 2. Fetch 3-Day Forecast
    const responseForecast = await fetch(forecastUrl);
    if (!responseForecast.ok) throw new Error("Could not fetch forecast data.");
    const forecastData = await responseForecast.json();
    displayForecast(forecastData);

  } catch (error) {
    console.error("Weather API Error:", error);
    if (weatherDesc) weatherDesc.textContent = "Weather currently unavailable";
  }
}

function displayCurrentWeather(data) {
  if (tempField) tempField.textContent = Math.round(data.main.temp);

  if (weatherDesc && data.weather && data.weather.length > 0) {
    const description = data.weather[0].description;
    weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);

    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${iconCode}@2x.png`);
    weatherIcon.setAttribute("alt", description);
  }
}

function displayForecast(data) {
  if (!forecastContainer) return;
  forecastContainer.innerHTML = "";

  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  const threeDayForecast = dailyForecasts.slice(0, 3);

  threeDayForecast.forEach(day => {
    const dateObj = new Date(day.dt_txt);

    // Get weekday name in English
    const options = { weekday: 'long' };
    let dayName = dateObj.toLocaleDateString('en-US', options);

    const temp = Math.round(day.main.temp);
    const desc = day.weather[0].description;
    const iconCode = day.weather[0].icon;

    // Create forecast element
    const forecastDay = document.createElement("div");
    forecastDay.classList.add("forecast-item");

    forecastDay.innerHTML = `
      <h4>${dayName}</h4>
      <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${desc}" loading="lazy">
      <p class="forecast-temp"><strong>${temp}&deg;C</strong></p>
      <p class="forecast-desc">${desc}</p>
    `;

    forecastContainer.appendChild(forecastDay);
  });
}


// --- Company Spotlights ---
const membersUrl = "data/members.json";
const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error("Could not load members data.");
    const data = await response.json();

    displaySpotlights(data.members);
  } catch (error) {
    console.error("Spotlight loading error:", error);
    if (spotlightContainer) spotlightContainer.innerHTML = "<p>Featured directory currently unavailable</p>";
  }
}

function displaySpotlights(members) {
  if (!spotlightContainer) return;
  spotlightContainer.innerHTML = "";

  // Filter: ONLY Silver and Gold memberships
  const eligibleMembers = members.filter(member =>
    member.membership === "Silver" || member.membership === "Gold"
  );

  // Shuffle array randomly
  const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

  // Select 2 or 3 members
  const selectedMembers = shuffledMembers.slice(0, 3);

  selectedMembers.forEach(member => {
    const spotlightCard = document.createElement("div");
    spotlightCard.classList.add("spotlight-card");
    spotlightCard.classList.add(member.membership.toLowerCase()); // add "silver" or "gold" class for custom borders

    spotlightCard.innerHTML = `
      <div class="spotlight-header">
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" class="spotlight-logo">
        <div>
          <h3>${member.name}</h3>
          <span class="badge ${member.membership.toLowerCase()}">${member.membership} Member</span>
        </div>
      </div>
      <p class="spotlight-desc">"${member.description}"</p>
      <hr>
      <div class="spotlight-contact">
        <p>📍 ${member.address}</p>
        <p>📞 ${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener" class="spotlight-link">Visit Website</a>
      </div>
    `;

    spotlightContainer.appendChild(spotlightCard);
  });
}

fetchWeather();
loadSpotlights();
