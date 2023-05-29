<template>
  <the-navbar></the-navbar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
export default {
  name: "FavoriteLayout",
  components: {
    TheNavbar,
  }
}
</script>

<style scoped>

</style>