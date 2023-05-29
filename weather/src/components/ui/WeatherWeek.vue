<template>
  <div v-for="i in weather">
    <hr/>
    <div class="weather-info">
      <div>
        <p class="weather__sub-text">Day</p>
        <p class="weather__temperature">{{ new Date(i.dt_txt).toLocaleString("en-US", { weekday: "long" }) }}</p>
      </div>
      <div>
        <p class="weather__sub-text right">Temp</p>
        <p class="weather__temperature">{{ i.main.temp }}°C</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "WeatherWeek",
  props: ['weather']
}
</script>

<style scoped>
.weather__title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}
</style>