<template>
  <app-loader v-if="loading"/>
  <div v-if="favoriteWeather.length === 0">
    <p>There is no chosen weather</p>
  </div>
  <info-weather
      v-else
      v-for="(weatherItem, index) in favoriteWeather"
      :key="index"
      :weather-item="weatherItem"
      :index="index"
  >
  </info-weather>
</template>

<script>
import InfoWeather from "@/components/ui/InfoWeather.vue";
import {ref, onMounted, watch, watchEffect} from 'vue';
import AppLoader from "@/components/ui/AppLoader.vue";

export default {
  name: "Favorite",
  components: {AppLoader, InfoWeather},
  setup() {
    const favoriteWeather = ref([]);
    const loading = ref(false);


    onMounted(() => {
      loading.value = true;
      favoriteWeather.value = JSON.parse(localStorage.getItem('favoriteWeatherItems')) || [];
      loading.value = false;
    });

    return {
      favoriteWeather,
      loading,
    };
  },
}
</script>

<style scoped>
p {
  font-size: 40px;
  color: white;
  text-align: center;
}
div {
  margin: 100px auto;
}
</style>