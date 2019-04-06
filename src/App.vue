<template>
  <div id="app">
    <ResetCSS/>
    <Header/>
    <Main/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ResetCSS from "./components/ResetCSS.vue";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Footer from "./components/Footer.vue";

export default Vue.extend({
  name: "app",
  components: {
    ResetCSS,
    Header,
    Main,
    Footer
  }
});
</script>

<style lang="scss">
body {
  transition: all 0.3s;
  // background: #a6cee2;
  background: #615fb4;
  font-family: "Nunito", sans-serif;
}

@media (max-width: 800px) {
  body {
    flex-direction: column;
  }

  header {
    position: relative;
    width: 100%;
    height: 50%;

    .left-inner {
      padding: 20px 0 10px;

      .image-container {
        display: none;
      }
    }
  }

  .page-right {
    position: relative;
    left: 0;
    padding: 0 0 0 10px;
    width: 100%;
    height: auto;
  }
}
</style>
