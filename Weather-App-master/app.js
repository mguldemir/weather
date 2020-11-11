const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".error-notification");
const dateElement = document.querySelector(".date");
let searchMethod;
// App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;

const key = "c3ced497d87fe48e4beb953b02da8b21";


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    notificationElement.getElementsByClassName.display = 'block';
    notificationElement.innerHTML = "Geolocation is not supported by this browser.";
}


function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    getWeather(latitude, longitude);
}


function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.date = data.dt;

            //DATE CALCULATION FROM UNIX TO TRADITIONAL
            var timestamp = weather.date; // replace your timestamp
            var date = new Date(timestamp * 1000);
            var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
            console.log(formattedDate);
            weather.today = formattedDate;
        })
        .then(function () {
            displayWeather();
            displayWeatherBackground();
        });
}

function displayWeatherBackground() {
    switch (weather.iconId) {
        case '01d':
            //clear sky
            document.body.style.background = "url('background/01d.jpeg')";
            break;
        //clear sky night
        case '01n':
            document.body.style.background = "url('background/01n.jpg')";
            break;
        //few clouds
        case '03d':
        case '03n':
        case '02d': {
            document.body.style.background = "url('background/03d.jpg')";
            break;
        }
        //rain
        case '09d':
        case '10d':
            document.body.style.background = "url('background/09d.jpeg')";
            break;
        //storm
        case '11d':
        case '11n':
            document.body.style.background = "url('background/11d.jpeg')";
            break;
        //snow
        case '13d':
        case '13n':
            document.body.style.background = "url('background/13d.jpeg')";
            break;
        //cloudy
        case '04d':
            document.body.style.background = "url('background/04d.jpg')";
            break;
        //cloudy night
        case '04n':
        case '02n':
        case '03n':
            document.body.style.background = "url('background/04n.jpg')";
            break;
        //mist
        case '50d':
        case '50n':
            document.body.style.background = "url('background/50d.jpg')";
            break;

    }
}


function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    dateElement.innerHTML = `${weather.today}`;

}

function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}


tempElement.addEventListener('click', function () {
    if (weather.temperature.value === undefined) {
        return;
    }

    if (weather.temperature.unit === "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
})













