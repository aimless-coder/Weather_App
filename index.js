//collection of json data through API
//Determining weather icon
// Determining wind direction 
//Rendering of data on Webpage

const searchBtnEl = document.getElementById("searchBtn");
const inputCityEl = document.getElementById("inputCity");
const weatherDetailsEl = document.getElementById("weatherDetails");
const errorSectionEl = document.getElementById("errorSection");
const initialSectionEl = document.getElementById("initialSection");

const keyAPI = "c7f9503a2d4beb9e5a148673f544310d";

const degToDirection = (deg) =>{

    // deg = (deg + 360)%360;

    const directions16 = [
        'N', 'N/NE', 'NE', 'E/NE',
        'E', 'E/SE', 'SE', 'S/SE',
        'S', 'S/SW', 'SW', 'W/SW',
        'W', 'W/NW', 'NW', 'N/NW'
    ];
    const index = Math.round((deg / 22.5) % 16);

    return directions16[index];
};

const generateIcon = (weatherData) =>{

    const iconId = parseInt((weatherData.weather[0].icon).replace(/[nd]/, ''));
    let iconName = "";

    switch(iconId){
        case 1:
            iconName = "clear";
            break;

        case 2:
            iconName = "few_cloud";
            break;
        
        case 3:
            iconName = "scattered_cloud";
            break;
            
        case 4:
            iconName = "broken_clouds";
            break;
        
        case 9:
            iconName = "shower_rain";
            break;

        case 10:
            iconName = "rain";
            break;
        
        case 11:
            iconName = "thunderstorm";
            break;
        
        case 13:
            iconName = "snow";
            break;

        case 50:
            iconName = "mist";
            break;

        default:
            iconName = "few_cloud";
            break;
    }

    return iconName;
}

const renderWeather = (weatherData) =>{

    return ` <div class="hero-display">
                    <div class="icon-box">
                        <img src="./assets/weather_icons/${generateIcon(weatherData)}.png">
                    </div>
                    <div class="main-temp">
                        <h1>${Math.round(weatherData.main.temp)}°C</h1>
                        <p>${weatherData.name}</p>
                    </div>
                </div>
                <div class="feel-like-temp">
                    <p>Feels like ${Math.round(weatherData.main.feels_like)}°C</p>
                </div>
                <div class="min-max-box">
                    <div class="min-box">
                        <h2>MIN</h2>
                        <p>${weatherData.main.temp_min}°C</p>
                    </div>
                    <div class="max-box">
                        <h2>MAX</h2>
                        <p>${weatherData.main.temp_max}°C</p>
                    </div>
                </div>
                <div class="detail-section">
                    <div class="weather-comp">
                        <div class="icon-comp">
                            <img src="./assets/icons/pressure.png">
                        </div>
                        <div class="value-comp">
                            <h2>Pressure</h2>
                            <p>${weatherData.main.pressure} millibars</p>
                        </div>
                    </div>

                    <div class="weather-comp">
                        <div class="icon-comp">
                            <img src="./assets/icons/humidity.png">
                        </div>
                        <div class="value-comp">
                            <h2>Humidity</h2>
                            <p>${weatherData.main.humidity}%</p>
                        </div>
                    </div>

                    <div class="weather-comp">
                        <div class="icon-comp">
                            <img src="./assets/icons/wind.png">
                        </div>
                        <div class="value-comp">
                            <h2>Wind Speed</h2>
                            <p>${weatherData.wind.speed} mps ${degToDirection(weatherData.wind.deg)}</p>
                        </div>
                    </div>

                    <div class="weather-comp">
                        <div class="icon-comp">
                            <img src="./assets/icons/visibility.png">
                        </div>
                        <div class="value-comp">
                            <h2>Visibility</h2>
                            <p>${(weatherData.visibility/1000)} KM</p>
                        </div>
                    </div>
                </div>`

}

const fetchData = async() =>{

    const cityName = inputCityEl.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keyAPI}&units=metric`;

    try {
        const res = await fetch(url);
        const weatherData = await res.json();

        if(weatherData.name){

            initialSectionEl.style.display = "none";
            errorSectionEl.style.display = "none";
            weatherDetailsEl.innerHTML = "";
            weatherDetailsEl.innerHTML = renderWeather(weatherData);

        }else{

            weatherDetailsEl.innerHTML = "";
            initialSectionEl.style.display = "block";
            errorSectionEl.style.display = "block";
            errorSectionEl.innerText = weatherData.message;
        }

    } catch (error) {
        console.log(error);
    }
};

searchBtnEl.addEventListener("click", fetchData);