// inputs de busqueda
const searchSubmit = document.getElementById("searchSubmit")
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")
// elementos del contenedor principal
const showCity = document.getElementById("showCity")
const showTemperature = document.getElementById("showTemperature")
const temperatureFeelsLike = document.getElementById("temperatureFeelsLike")
const weatherIcon = document.getElementById("weatherIcon")
const weatherDescription = document.getElementById("weatherDescription")
const weatherMin = document.getElementById("weatherMin")
const weatherMax = document.getElementById("weatherMax")
const timezone = document.getElementById("timezone")
const date = document.getElementById("date")
// elementos del contenedor con mas informacion
const showClouds = document.getElementById("clouds")
const showHumidity = document.getElementById("humidity")
const showPressure = document.getElementById("pressure")
const showVisibility = document.getElementById("visibility")
const showWind = document.getElementById("wind")

// apikey 
const apiKey = "4e5707dbee57bb8922d4b1c90f1678f5"

function showMoreInfo(clouds,humidity,pressure,visibility,deg,speed) {

    showClouds.innerText = "Nubes: " + clouds + "%"
    showHumidity.innerText = "Humedad: " + humidity + "%"
    showPressure.innerText = "Presion: " +pressure + " hPa"
    showVisibility.innerText = "Visibilidad: " + visibility / 1000 + " km"
    
    if (deg >= 0 && deg <45) {
        console.log("viento del norte");
        showWind.innerText = "Viento: Norte a " + speed + " mts/s"
    }
    else if(deg >= 45 && deg <90) 
    {
        console.log(("viento del noreste"));
        showWind.innerText = "Viento: Noreste a " + speed + " mts/s"
    }
    else if(deg >= 90 && deg <135) 
    {
        console.log(("viento del este"));
        showWind.innerText = "Viento: Este a " + speed + " mts/s"
    }
    else if(deg >= 135 && deg <180) 
    {
        console.log(("viento del sudeste"));
        showWind.innerText = "Viento: Sudeste a " + speed + " mts/s"
    }
    else if(deg >= 180 && deg <225) 
    {
        console.log(("viento del sur"));
        showWind.innerText = "Viento: Sur a " + speed + " mts/s"
    }
    else if(deg >= 225 && deg <270) 
    {
        console.log(("viento del suroeste"));
        showWind.innerText = "Viento: Suroeste a " + speed + " mts/s"
    }
    else if(deg >= 270 && deg <315) 
    {
        console.log(("viento del oeste"));
        showWind.innerText = "Viento: Oeste a " + speed + " mts/s"
    }
    else if(deg >= 315 && deg <360) 
    {
        console.log(("viento del noroeste"));
        showWind.innerText = "Viento: Noroeste a " + speed + " mts/s"
    }
     
}

function showInfo(name,country, temperature, feelsLike, icon, description,searchedDate,searchedTime, wMin, wMax) {
    showCity.innerHTML = name + ", " + country
    showTemperature.innerText = "Temperatura actual: " + temperature + " °C"
    temperatureFeelsLike.innerText = "Sensacion termica: " + feelsLike + " °C"
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`)
    weatherDescription.innerHTML = description 
    date.innerHTML = "Ahora en " + name + " es: " + searchedDate
    timezone.innerHTML = "Hora: " + searchedTime
    weatherMin.innerHTML = "Min: " + wMin + " °C"
    weatherMax.innerHTML = "Max: " + wMax + " °C"

}

const searchCity = async (cityName) => {
    
    let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=es&units=metric&appid=${apiKey}`
    try {
        const response = await fetch(searchUrl)
        const data = await response.json()
        console.log(data);

        if (data.cod == 404) {
            alert("Ubicacion no encontrada, intenta nuevamente")
        }
        
        let name = data.name
        let country = data.sys.country
        let temperature = data.main.temp.toFixed(1)
        let feelsLike = data.main.feels_like.toFixed(1)
        let icon = data.weather[0].icon
        let description = data.weather[0].description.charAt(0).toUpperCase()+ data.weather[0].description.slice(1)
        let min = data.main.temp_min.toFixed(1)
        let max = data.main.temp_max.toFixed(1)
       
        // instancio el objeto Date para obtener el tiempo local
        let localDate = new Date()
        // obtengo el tiempo en milisegundos
        let localTime = localDate.getTime()
        // obtengo el tiempo UTC segun el pais
        let localOffset = localDate.getTimezoneOffset() * 60000
        // obtengo el tiempo UTC actual sumando el tiempo actual del pais mas la diferencia con el horario UTC actual
        let utc = localTime + localOffset
        // obtengo la diferencia actual de tiempo del pais que busco en minutos
        let offset = data.timezone
        // convierto la diferencia de minutos a milisegundos
        let searchedLocation = utc + (1000 * offset)
        // instancio el objeto date con la variable del lugar que busco
        let searchedLocationDate = new Date(searchedLocation)

        let searchedDate = searchedLocationDate.toLocaleDateString()

        let searchedTime = searchedLocationDate.toLocaleTimeString()

        showInfo(name,country, temperature, feelsLike, icon, description,searchedDate,searchedTime, min, max)
    
        let clouds = data.clouds.all
        let humidity = data.main.humidity
        let pressure = data.main.pressure
        let visibility = data.visibility
        let deg = data.wind.deg
        let speed = data.wind.speed
        
        console.log();
     
        showMoreInfo(clouds,humidity,pressure,visibility,deg,speed)
    
    } catch (error) {

    }
}

searchCity("Buenos Aires")

searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    searchCity(searchInput.value) 
})

