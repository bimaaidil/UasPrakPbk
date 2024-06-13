<template>
    <q-page class="column items-center justify-center q-pa-md">
      <div class="input-section">
        <q-input v-model="newLocation" label="Enter Location" />
        <q-btn @click="addWeatherWidget" label="Add Widget" color="blue" />
        <q-select
          v-model="selectedTask"
          :options="taskOptions"
          label="Select Task"
          @update:model-value="performTask"
          emit-value
          map-options
        />
      </div>
      <div class="widgets-section">
        <div
          v-for="(weather, index) in weatherStore.weatherWidgets"
          :key="index"
          class="weather-widget"
        >
          <q-icon :name="getWeatherIcon(weather.weather[0].main)" size="50px" />
          <div class="location">
            <h2>{{ weather.name }}</h2>
          </div>
          <div class="temperature">
            <p>{{ convertTemp(weather.main.temp) }}</p>
          </div>
          <div class="details">
            <p>{{ weather.weather[0].description }}</p>
            <p>Wind: {{ weather.wind.speed }} m/s</p>
            <p>Humidity: {{ weather.main.humidity }}%</p>
            <p>Feels Like: {{ convertTemp(weather.main.feels_like) }}</p>
          </div>
          <q-btn
            @click="removeWidget(index)"
            label="Remove Widget"
            color="negative"
          />
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { QPage, QInput, QBtn, QIcon, QSelect } from "quasar";
  import { useWeatherStore } from "../stores/weatherStore";
  
  const weatherStore = useWeatherStore();
  const newLocation = ref("");
  const selectedTask = ref(null);
  
  const taskOptions = [
    { value: 1, label: "Task 1", url: "https://bima-projectcv.vercel.app/" },
    { value: 2, label: "Task 2", url: "https://bima-aidil-223510563-4e-prakpbk.vercel.app/" },
    { value: 3, label: "Task 3", url: "https://bimaaidil223510563.vercel.app/" },
    { value: 4, label: "Task 4", url: "https://tugas4pbk-seven.vercel.app/" },
    { value: 5, label: "Task 5", url: "https://bimaaidil223510563tugas5-nohyfbuss-bimaaidils-projects.vercel.app/" },
    { value: 6, label: "Task 6", url: "https://tugas6-seven.vercel.app/" }
  ];
  
  const weatherIconMapping = {
    Clear: "wb_sunny",
    Clouds: "cloud",
    Rain: "grain",
    Drizzle: "grain",
    Thunderstorm: "flash_on",
    Snow: "ac_unit",
    Mist: "blur_on",
    Smoke: "blur_on",
    Haze: "blur_on",
    Dust: "blur_on",
    Fog: "blur_on",
    Sand: "blur_on",
    Ash: "blur_on",
    Squall: "blur_on",
    Tornado: "toys",
  };
  
  const convertTemp = (tempInCelsius) => {
    return `${tempInCelsius.toFixed(1)} °C / ${((tempInCelsius * 9) / 5 + 32).toFixed(1)} °F`;
  };
  
  const getWeatherIcon = (weatherMain) => {
    return weatherIconMapping[weatherMain] || "wb_cloudy";
  };
  
  const addWeatherWidget = async () => {
    await weatherStore.fetchWeather(newLocation.value);
    newLocation.value = "";
  };
  
  const removeWidget = (index) => {
    weatherStore.removeWidget(index);
  };
  
  const performTask = (taskValue) => {
    const selectedTask = taskOptions.find(task => task.value === taskValue);
    if (selectedTask) {
      window.location.href = selectedTask.url;
    }
  };
  </script>
  
  <style scoped>
  .input-section {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .widgets-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .weather-widget {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 150px;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    word-wrap: break-word;
  }
  
  .weather-widget h2 {
    font-size: 1.2em;
    margin: 10px 0;
  }
  
  .weather-widget p {
    font-size: 0.9em;
    margin: 5px 0;
  }
  </style>
  