const weatherApi = "https://api.weather.gov/alerts/active?area="

fetchWeatherAlerts(state)

fetch('https://api.weather.gov/alerts/active?area=${STATE_ABBR}')

displayAlerts(data)

.catch(errorObject => console.log(errorObject.message))
