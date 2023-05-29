<template>

  <request-search></request-search>

  <div v-if="weatherData.length === 0"></div>
  <info-weather
      v-else
      v-for="(weatherItem, index) in weatherData"
      :key="index"
      :weather-item="weatherItem"
      :index="index"
  ></info-weather>



</template>

<script>
import RequestSearch from "@/components/request/RequestSearch.vue";
import InfoWeather from "@/components/ui/InfoWeather.vue";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import AppLoader from "@/components/ui/AppLoader.vue";
import TempChart from "@/components/ui/TempChart.vue";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const weatherData = computed(() => store.getters.getWeather);
    const loading = ref(false);


    console.log(weatherData.value);

    return {
      loading,
      weatherData,
    }
  },
  components: {AppLoader, InfoWeather, RequestSearch, TempChart}
}
</script>

<style scoped>

</style>