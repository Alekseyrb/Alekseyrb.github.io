import {createStore} from "vuex";
import axios from 'axios';

export default createStore({
    state() {
        return {
            city: null,
            weather: [],
            cityById: [],
            favorites: JSON.parse(localStorage.getItem('favoriteWeatherItems')) || [],
        }
    },
    mutations: {
        setCity(state, city) {
            state.city = city;
        },
        setWeather(state, weather) {
            state.weather.push(weather);
        },
        addToFavorites(state, weatherItem) {
            if (!state.favorites.find(item => item.city.name === weatherItem.city.name)) {
                state.favorites.push(weatherItem);
            }
            localStorage.setItem('favoriteWeatherItems', JSON.stringify(state.favorites));
        },
        removeFromFavorites(state, weatherItem) {
            const index = state.favorites.findIndex(item => item.city.name === weatherItem.city.name);
            if (index > -1) {
                state.favorites.splice(index, 1);
            }
            localStorage.setItem('favoriteWeatherItems', JSON.stringify(state.favorites));
        },
        setCityById(state, city) {
            state.cityById.push(city);
        }
    },
    actions: {
        async getWeather({commit}, {city, countryCode}) {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=d2b651d73bedf6cd42912ffd131af1a9&units=metric`);
                commit('setWeather', res.data);
            } catch (e) {
                console.error(e.message);
            }
        },
        async searchCity(_, cityName) {
            try {
                const response = await axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${cityName}`);
                return response.data.data;
            } catch (e) {
                console.error(e.message);
            }
        },
        async getCityAndCountryCodeByIP({commit}) {
            try {
                const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                const { city, country_code } = response.data;
                commit('setCityById', {city: city, countryCode: country_code})
            } catch (error) {
                console.error('Ошибка при получении данных:', error.message);
            }
        }
    },
    getters: {
        getWeather(state) {
            return state.weather;
        },
        getFavoriteStatus: (state) => (weatherItem) => {
            return state.favorites.some(item => item.city.name === weatherItem.city.name);
        },
        getCityById(state) {
            return state.cityById;
        }
    },
})
