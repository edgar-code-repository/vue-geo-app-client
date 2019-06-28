<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/layout/navbar/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>

<style>

</style>
