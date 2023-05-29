<template>
  <app-loader v-if="loading"/>
  <div v-else>
    <div class="autocomplete">
      <input
          v-model="searchText"
          @input="searchCity"
          type="text"
          placeholder="Search by city"
      >
      <div
          class="autocomplete-items"
          v-if="cities.length > 0"
      >
        <div
            v-for="city in cities"
            :key="city.id"
            @click="selectCity(city)"
        >
          {{ city.name }}, {{ city.country }}
        </div>
      </div>
    </div>
    <button class="btn add" @click="addCity">+</button>
    <button class="btn left" @click="addCityByIP">Get city by Ip</button>
  </div>
  <app-modal
      v-if="count > 5 && close"
      title="You can only create 5 cards, delete some if you want to add more"
      @close="close = false"
  ></app-modal>

</template>

<script>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import AppModal from "@/components/ui/AppModal.vue";
import AppLoader from "@/components/ui/AppLoader.vue";

export default {
  name: "RequestSearch",
  components: {AppLoader, AppModal},
  setup() {
    const city = ref('');
    const store = useStore();
    const searchText = ref('');
    const cities = ref([]);
    const count = ref(0);
    const weather = store.getters.getWeather;
    const close = ref(false);
    const loading = ref(false);
    const cityByIp = ref();

    const a = ref();
    const b = ref();

    const searchCity = () => {
      if (searchText.value.length > 0) {
        store.dispatch('searchCity', searchText.value)
            .then(response => {
              cities.value = response
            })
      }
    }

    onMounted(() => {
      cityByIp.value = store.dispatch("getCityAndCountryCodeByIP");
    })

    const addCityByIP = () => {
      cityByIp.value && store.dispatch('getWeather', {city: store.state.cityById[0].city, countryCode: store.state.cityById[0].countryCode});
    }

    const selectCity = (city) => {
      a.value = city.city;
      b.value = city.countryCode
      store.commit('setCity', city);
      cities.value = [];
      searchText.value = city.name;
    }

    const addCity = () => {
      count.value = weather.length;
      console.log(count.value);
      if (searchText.value.length !== 0) {
        count.value++;
        console.log(count.value);
      }
      if (count.value < 6 && searchText.value.length !== 0) {
        loading.value = true;
        store.dispatch('getWeather', {city: a.value, countryCode: b.value});
        loading.value = false;
        searchText.value = '';
      }
      if (count.value > 5) {
        close.value = true;
      }
    }


    return {
      searchText,
      cities,
      searchCity,
      selectCity,
      city,
      addCity,
      count,
      weather,
      close,
      loading,
      addCityByIP,
    }

  }
}
</script>

<style scoped>

div {
  position: relative;
}

.add {
  position: absolute;
  right: 170px;
  top: -5px;
}

.left {
  position: absolute;
  left: 90px;
  top: -5px;
}

input {
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

.autocomplete {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 0 auto;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid transparent;
  background-color: #f1f1f1;
}

input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

.autocomplete-items div:hover {
  background-color: #e9e9e9;
}

@media(max-width: 1200px) {
  .autocomplete {
    width: 400px;
  }
  .add {
    right: 15%;
  }
  .left {
    left: 5%;
  }
}

@media (max-width: 800px) {
  .autocomplete {
    width: 250px;
  }
  .btn {
    font-size: 10px;
  }
  .add {
    right: 10%;
    top: -3px;
  }
  .left {
    top: 40px;
    left: 16%;
  }
}

@media (max-width: 450px) {
  .add {
    right: 15%;
    top: 40px;
  }
}
@media (max-width: 320px) {
  .left {
    left: 11%;
  }
}

</style>