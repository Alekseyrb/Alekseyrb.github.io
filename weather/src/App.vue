<template>
  <div class="main">
    <component :is="layout + '-layout'" v-if="layout"></component>
  </div>
</template>

<script>
import MainLayout from "@/layout/MainLayout.vue";
import FavoriteLayout from "@/layout/FavoriteLayout.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  name: "App",
  setup() {
    const route = useRoute();

    return {
      layout: computed(() => route.meta.layout),
    }
  },
  components: {
    MainLayout,
    FavoriteLayout,
  }
}
</script>

<style>
.container {
  max-width: 1120px;
  margin: 0 auto;
  height: 100%;
  min-height: 100vh;
}

@media(max-width: 1200px) {
  .autocomplete {
    width: 400px;
  }
}

.main {
  --tw-bg-opacity: 1;
  background-color: rgb(0 102 138 / var(--tw-bg-opacity));

}

* {
  padding: 0;
  margin: 0;
  border: 0;
}

*, *:before, *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

:focus, :active {
  outline: none;
}

a:focus, a:active {
  outline: none;
}

nav, footer, header, aside {
  display: block;
}

html, body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

input, button, textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a, a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

</style>