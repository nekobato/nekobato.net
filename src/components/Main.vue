<template>
  <main>
    <Apps/>
    <Education/>
    <Experience/>
  </main>
</template>
<script>
import Apps from "./Apps.vue";
import Education from "./Education.vue";
import Experience from "./Experience.vue";

export default {
  components: {
    Apps,
    Education,
    Experience
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
main {
  position: relative;
  top: 0;
  left: 50%;
  padding-bottom: 40px;
  text-align: left;
  width: 480px;
  background: #fff;

  section {
    h1 {
      position: relative;
      display: inline-block;
      margin: 40px 0 0 0;
      padding: 8px 16px;
      background: #000;
      color: #ededed;
      font-size: 24px;
      left: -40px;
    }

    .section-content {
      margin: 24px 0 0 0;
    }
  }
}
</style>
