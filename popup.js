// http://api.openweathermap.org/data/2.5/air_pollution?lat=28.7041&lon=77.345&appid=bd4dbcd6a30867fe25270c8b65e8cf2e
// fucntion to fetch the data
const apiKey = 'bd4dbcd6a30867fe25270c8b65e8cf2e'
async function fetchPollutionInfo(lat, lon) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        // console.log(data);
        renderToUi(data);
    }
    catch (e) {
        console.log("Error while fetching the data", error);
    }

}

// function to render the data to the UI
const maskAdvise = document.querySelector("#Mask_advise");

function renderToUi(data) {
    const airQuality = document.querySelector("#AQI");
    const polDesc = document.querySelector("#Pol_desc");
    const coLevel = document.querySelector("#CO");
    const noLevel = document.querySelector("#NO");
    const no2Level = document.querySelector("#NO2");
    const o3Level = document.querySelector("#O3");
    const so2Level = document.querySelector("#SO2");
    const nh3Level = document.querySelector("#NH3");
    const pm2_5Level = document.querySelector("#PM2_5");
    const pm10Level = document.querySelector("#PM10");
    const pollutionLevel = getPollutionDescription(data.list[0]?.main?.aqi);



    polDesc.innerHTML = `Air Quality: ${pollutionLevel}`;
    coLevel.innerHTML = `CO: ${data?.list[0]?.components?.co} pphm`;
    noLevel.innerHTML = `NO: ${data?.list[0]?.components?.no} pphm`;
    no2Level.innerHTML = `NO2: ${data?.list[0]?.components?.no2} pphm`;
    o3Level.innerHTML = `O3: ${data?.list[0]?.components?.o3} pphm`;
    so2Level.innerHTML = `SO2: ${data?.list[0]?.components?.so2} pphm`;
    nh3Level.innerHTML = `NH3: ${data?.list[0]?.components?.nh3} pphm`;
    pm2_5Level.innerHTML = `PM2.5: ${data?.list[0]?.components?.pm2_5} pphm`;
    pm10Level.innerHTML = `PM10: ${data?.list[0]?.components?.pm10} pphm`;
    airQuality.innerHTML = `Air Quality Index: ${data.list[0]?.main?.aqi}`;
    maskAdvise.innerHTML = `${getMaskAdvice(data.list[0]?.main?.aqi)}`;

}

// function to get the pollution description
function getPollutionDescription(aqi) {
    if (aqi >= 0 && aqi <= 50) {
        return 'Good';
    } else if (aqi > 50 && aqi <= 100) {
        return 'Moderate';
    } else if (aqi > 100 && aqi <= 150) {
        return 'Unhealthy for Sensitive Groups';
    } else if (aqi > 150 && aqi <= 200) {
        return 'Unhealthy';
    } else if (aqi > 200 && aqi <= 300) {
        return 'Very Unhealthy';
    } else {
        return 'Hazardous';
    }
}

// function to get the mask advise
function getMaskAdvice(aqi) {
    if (aqi <= 50) {
        return 'Air quality is good. No need for a mask.';
    } else if (aqi <= 100) {
        return 'Air quality is moderate. You may consider wearing a mask if sensitive to pollution.';
    } else if (aqi <= 150) {
        return 'Air quality is unhealthy for sensitive groups. Consider wearing a mask outdoors.';
    } else if (aqi <= 200) {
        return 'Air quality is unhealthy. Wear a mask if spending prolonged time outdoors.';
    } else if (aqi <= 300) {
        return 'Air quality is very unhealthy. A mask is recommended for all outdoor activities.';
    } else {
        return 'Air quality is hazardous. Avoid outdoor activities and wear a mask if necessary.';
    }
}


//function to get the city name 
async function getCityName(lat, lon){
    const URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${apiKey}`
    const response = await fetch(URL);
    const data = await response.json();
    console.log("Country data", data);
    renderCityName(data);
}
// function to render the city name and flag to the UI
function renderCityName(data){
    const cityName = document.querySelector(".city-name");
    const flag = document.querySelector(".flag");
    cityName.innerHTML = data[0]?.name;
    flag.src = `https://flagcdn.com/144x108/${data[0]?.country.toLowerCase()}.png`
}
// function to get location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("Geolocation is not supported in your browser");
    }
}
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // console.log(lat); 
    // console.log(lon); 
    fetchPollutionInfo(lat, lon);
    getCityName(lat, lon);
}
getLocation();

