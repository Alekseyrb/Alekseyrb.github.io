<template>
  <div class="weather-container" :class="{ favorite: isFavorite }">
    <div class="weather__title">
      <div>
        <h2>{{ weatherItem.city.name }}</h2>
        <h3>{{ weatherItem.list[0].dt_txt }}</h3>
      </div>
      <div class="weather__switch">
        <p @click="toggleView(index, false); isShowChart = false" :class="{act: !isDay[index]}">DAY /</p>
        <p @click="toggleView(index, true); isShowChart = false" :class="{act: isDay[index]}">WEEK</p>
      </div>
    </div>
    <weather-week v-if="isDay[index]" :weather="getWeatherForFive(index)"></weather-week>
    <weather-day v-else :weather="weatherItem.list"></weather-day>
    <button class="btn danger" @click="removeBlock(index)">Remove card</button>

    <button class="btn " @click="isShowChart = !isShowChart">{{ isShowChart ? 'Close Chart' : 'Show Chart'}}</button>

    <temp-chart
        v-if="isShowChart"
        :y="isDay[index] ? limitedDays : hoursFirstDay"
        :x="isDay[index] ? temperatures: tempsFirstDay"
    />

    <button class="btn fav" @click="toggleFavorite">
      {{ isFavorite ? 'Remove' : 'Favorite' }}
    </button>

  </div>
  <app-modal
      v-if="showModal"
      title="Are you sure you want to delete this card?"
      @close="showModal = false"
  >
    <button class="btn danger" @click="isRem = true; showModal = false">YES</button>
    <button class="btn " @click="isRem = false; showModal = false">NO</button>
  </app-modal>

</template>

<script>
import WeatherDay from "@/components/ui/WeatherDay.vue";
import WeatherWeek from "@/components/ui/WeatherWeek.vue";
import {ref, watch, computed} from "vue";
import {useStore} from "vuex";
import AppModal from "@/components/ui/AppModal.vue";
import TempChart from "@/components/ui/TempChart.vue";

export default {
  name: "InfoWeather",
  components: {TempChart, AppModal, WeatherWeek, WeatherDay},
  props: ['weatherItem', 'index'],
  setup(props) {
    const store = useStore();
    const weatherData = computed(() => store.getters.getWeather);
    const isDay = ref([]);
    const showModal = ref(false);
    const isRem = ref(false);
    const isShowChart = ref(false);
    const isFavorite = computed(() => store.getters.getFavoriteStatus(props.weatherItem));

    function formatDay(dateString) {
      const date = new Date(dateString);
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }

    const uniqueDays = [...new Set(props.weatherItem.list.map(item => item.dt_txt.split(' ')[0]))];
    const formattedDays = uniqueDays.map(day => formatDay(day));
    const limitedDays = formattedDays.slice(0, 5);

    const temperatures = props.weatherItem.list.filter(item => item.dt_txt.includes("12:00")).map(item => item.main.temp);

    const firstDay = props.weatherItem.list[0].dt_txt.split(' ')[0];

    const hoursFirstDay = props.weatherItem.list
        .filter(item => item.dt_txt.startsWith(firstDay))
        .map(item => item.dt_txt.split(' ')[1].split(':')[0]);

    const tempsFirstDay = props.weatherItem.list
        .filter(item => item.dt_txt.startsWith(firstDay))
        .map(item => item.main.temp);

    const toggleFavorite = () => {
      isFavorite.value ?
          store.commit('removeFromFavorites', props.weatherItem) :
          store.commit('addToFavorites', props.weatherItem);
    };

    watch(weatherData, (val) => {
      isDay.value = Array(val.length).fill(true);
    });

    const getWeatherForFive = (index) => {
      return weatherData.value[index].list.filter((obj) => {
        const date = new Date(obj.dt_txt);
        return date.getHours() === 12;
      });
    };

    const toggleView = (index, value) => {
      isDay.value[index] = value;
    };

    const removeBlock = (index) => {
      showModal.value = true;
      watch(isRem, (val) => {
        if (val === true) {
          weatherData.value.splice(index, 1);
          isRem.value = false;
        }
      })
    };

    return {
      isDay,
      weatherData,
      getWeatherForFive,
      toggleView,
      removeBlock,
      showModal,
      isRem,
      isFavorite,
      toggleFavorite,
      hoursFirstDay,
      tempsFirstDay,
      limitedDays,
      temperatures,
      isShowChart
    };
  },
};
</script>


<style>
.weather-container.favorite {
  border: 2px solid yellow;
}

.fav {
  position: absolute;
  right: -155px;
  top: 15px;
}

.weather-container {
  width: 600px;
  min-height: 300px;
  margin: 20px auto;
  padding: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  background-color: white;
}

.weather-container h2 {
  font-size: 30px;
  margin-bottom: 20px;
}

.weather-container h3 {
  font-size: 25px;
  margin-bottom: 10px;
}

.weather__title {
  display: flex;
  justify-content: space-between;
}

.weather__switch p {
  display: inline;
  font-size: 17px;
  cursor: pointer;
}

.act {
  font-weight: bold;
}

@media (max-width: 1200px) {
  .weather-container {
    margin-top: 50px;
    width: 400px;
  }

  .fav {
    right: -130px;
  }

  .weather__temperature {
    font-size: 20px;
  }

  .weather__sub-text {
    font-size: 15px;
  }

  .weather-container h2 {
    font-size: 25px;
  }

  .weather-container h3 {
    font-size: 20px;
  }

  .weather__switch p {
    font-size: 15px;
  }
}

@media (max-width: 800px) {
  .btn {
    font-size: 10px;
  }
  .fav {
    right: 10%;
    top: 65px;
  }
}

@media (max-width: 410px) {
  .weather-container {
    width: 250px;
    padding: 10px;
  }
  .btn {
    font-size: 8px;
  }
  .weather__switch p{
    font-size: 10px;
  }
  .fav {
    right: 0%;
    top: 17px;
  }
  .weather__temperature {
    font-size: 15px;
  }

  .weather__sub-text {
    font-size: 10px;
  }

  .weather-container h2 {
    font-size: 20px;
  }

  .weather-container h3 {
    font-size: 15px;
  }

  .weather__switch p {
    font-size: 10px;
  }
}
</style>