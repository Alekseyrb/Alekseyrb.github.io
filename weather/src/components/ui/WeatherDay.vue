<template>
  <hr/>
  <div class="weather-info">
    <div>
      <p class="weather__sub-text">Temp</p>
      <p class="weather__temperature">{{ weather[0].main.temp }}°C</p>
    </div>
    <div>
      <p class="weather__sub-text right">MIN/MAX</p>
      <p class="weather__temperature min">{{ weather[0].main.temp_min }}°C/{{ weather[0].main.temp_max }}°C</p>
    </div>
  </div>
  <hr/>
  <div class="weather-info">
    <div>
      <p class="weather__sub-text ">Feels Like</p>
      <p class="weather__temperature min">{{ weather[0].main.feels_like }}°C</p>
    </div>
    <div>
      <p class="weather__sub-text right">Weather</p>
      <p class="weather__temperature min">{{ weather[0].weather[0].main }}</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "WeatherDay",
  props: ['weather'],
}
</script>

<style>
hr {
  border: 1px solid gray;
}

.weather-info {
  margin: 10px 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.weather__sub-text {
  font-size: 20px;
  color: gray;
  margin-bottom: 10px;
}

.weather__temperature {
  font-size: 35px;
}

.right {
  text-align: right;
}

.min {
  font-size: 30px;
}

.btn {
  color: blue;
  position: relative;
  place-content: center;
  place-items: center;
  width: fit-content;
  border-radius: 99px;
  letter-spacing: 0.05em;
  border: 1px solid white;
  text-decoration: none;
  text-transform: uppercase;
  /*margin-right: 10px;*/
  margin-top: 10px;
  padding: 0.5rem 1.5rem;
  white-space: nowrap;
  font-weight: 700;
  outline: none;
  background: #fff;
  transition: all 0.22s;
}

.btn:hover {
  cursor: pointer;
  opacity: 0.8;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 1!important;
  background: #eee!important;
  border-color: #ddd!important;
  color: #999!important;
}

.btn:active {
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.btn.danger {
  background: #e53935;
  color: #fff;
  border-color: #e53935;
}

</style>