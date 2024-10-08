<template>
<div id="weather">
    <p><input type="text" placeholder="City" v-model="city" required/></p>
    <p><button @click="fetchSearchLocationWeather" class="search-button"> Search weather</button></p>
</div>
<main v-if = "weatherData">
        <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
    <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <div v-if="isSearched">
        <p>{{ searchTemperature }} °C</p>
        </div>
        <div v-else>
        <p>{{ currentTemperature }} °C</p>
        </div>
    </div>
    <span>{{ weatherData.weather[0].description }}</span>
</main>
<p v-else>Loading weather data...</p>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const apikey = "8c17964a911c4ab2bc79c96ab6733b18";

const city = ref("")
const weatherData = ref(null);
const geoData = ref(null);
const isSearched = ref(false);
// const hourlyForecast = ref([])
// const dailyForecast = ref([])

const currentTemperature = computed(() => {
    return weatherData.value
      ? Math.floor(weatherData.value.main.temp - 273)
      : null;
});

const searchTemperature = computed(() => {
    return weatherData.value
      ? Math.floor(weatherData.value.main.temp)
      : null;
});

const iconUrl = computed(() => {
    return weatherData.value
    ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
    : null;
});

const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
      await fetchWeatherData(url);
    });
  }}

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    weatherData.value = response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const fetchSearchLocationWeather = async () => {
    try {
        const locationArray = city.value.split(',').map(item => item.trim());
        const cityName = locationArray[0];
        const countryCode = locationArray[1] || '';
        const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${apikey}`;
        const response = await axios.get(locationUrl);

        geoData.value = response.data;
        
        if (geoData.value.length > 0) {
        const { lat, lon } = geoData.value[0];
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
        await fetchWeatherData(weatherUrl);
        isSearched.value = true;
        } else {
        console.error("No location found");
        }
    } catch (error) {
        console.error("Error fetching geolocation data:", error);
    }
};



onMounted(fetchCurrentLocationWeather);


</script>