const weatherApi = "https://api.weather.gov/alerts/active?area="

// fetchWeatherAlerts(state)

// fetch('https://api.weather.gov/alerts/active?area=${STATE_ABBR}')

// displayAlerts(data)

// .catch(errorObject => console.log(errorObject.message))

const stateInput = document.getElementById("state-input");
const fetchBtn = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Function to display alerts
function displayAlerts(data) {
  // Clear previous alerts
  alertsDisplay.innerHTML = "";

  const features = data.features || [];
  const alertCount = features.length;
  const countHeader = document.createElement("h2");
  countHeader.textContent = `Weather Alerts: ${alertCount}`;
  alertsDisplay.appendChild(countHeader);

  // List of headlines
  const ul = document.createElement("ul");
  features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature.properties.headline;
    ul.appendChild(li);
  });

  alertsDisplay.appendChild(ul);
}

// Function to fetch weather alerts from API
function fetchWeatherAlerts(state) {
  // Reset error message 
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";

  // Check for empty input
  if (!state || state.trim() === "") {
    showError("Please enter a valid state abbreviation.");
    return;
  }

  const url = `${weatherApi}${state.trim().toUpperCase()}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayAlerts(data);
    })
    .catch((error) => {
      console.log(error.message);
      showError(error.message);
    });
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

fetchBtn.addEventListener("click", () => {
  const state = stateInput.value;
  stateInput.value = ""; 
  fetchWeatherAlerts(state);
});
