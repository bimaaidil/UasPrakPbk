// src/stores/weatherStore.js
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weatherWidgets: [],
  }),
  actions: {
    async fetchWeather(location) {
      const apiKey = "c7afa88ffd733ed5f51dcfbc525687ee"; // Replace with your API key
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const weather = await response.json();
        this.weatherWidgets.push(weather);
      } catch (error) {
        console.error("Failed to fetch weather data:", error.message);
      }
    },
    removeWidget(index) {
      this.weatherWidgets.splice(index, 1);
    },
  },
});