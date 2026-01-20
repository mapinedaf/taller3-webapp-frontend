<template>
  <Navbar titulo="Grupo 6" />
  <!--Router view-->

  <ResnetPage/>
  <PlotResnetVue/>

</template>

<script>
import ResnetPage from "./pages/ResnetPage.vue"
import Navbar from "./components/Navbar.vue";
import PlotResnetVue from './pages/PlotResnet.vue';

export default {
  name: 'App',
  components: {
    ResnetPage,
    Navbar,
    PlotResnetVue
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
