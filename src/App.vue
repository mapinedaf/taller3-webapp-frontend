<template>
  <Navbar titulo="Grupo 6" @home-clicked="handleHomeClick" @link-clicked="handleLinkClick" />
  <router-view></router-view>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    
    return {
      handleHomeClick() {
        router.push('/');
      },
      handleLinkClick() {
        router.push('/plot');
      }
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
