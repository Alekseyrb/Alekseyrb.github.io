<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <img src="src/img/sun.png" alt="sun" class="header__sun"/>
        <p class="header__text">
          Weather
        </p>
      </div>
      <ul class="header__menu">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/favorite">Favorites</router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheLogo"
}
</script>

<style scoped>
.header {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
}

.header__logo {
  display: flex;
  justify-content: flex-start;
}

.header__text {
  font-size: 40px;
  margin: 10px 0 0 10px;
  color: white;
}

.header__sun {
  width: 60px;
  height: 60px;
}

.header__content {
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  box-sizing: border-box;
}

.header__menu {
  display: flex;
}

.header__menu li {
  margin-right: 2rem;
}

.header__menu li a {
  font-size: 20px;
  color: white;
  text-decoration: none;
}

.header__menu li a:hover, .header__menu li a.active {
  border-bottom: 2px solid #3eaf7c;
}

@media (max-width: 800px) {
  .header__text {
    font-size: 25px;
    margin: 16px 0 0 -5px;
  }
  .header__content {
    margin-bottom: 30px;
    padding: 0;
  }
  .header__menu li {
    margin-right: 1rem;
  }
}
</style>