<template>
  <Navbar titulo= "ModeloAlejo" />
  <WebcamView />

  <div>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary">Capturar</button>
      <button type="button" class="btn btn-primary">Predecir</button>
      <button type="button" class="btn btn-primary">Restaturar</button>
    </div>
  </div>
  <div>
    Resultados
    <ul>

    </ul>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import WebcamView from "../components/WebcamView.vue";

export default {
  name: "AlejoPage",
  components: {
    Navbar,
    WebcamView,
  },
  props: {},
};
</script>

<style>
</style>