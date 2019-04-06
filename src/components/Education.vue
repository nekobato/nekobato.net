<template>
  <section class="education">
    <h1>Education</h1>
    <div class="section-content">
      <ul class="education-list">
        <li v-for="(edu, index) in education" :key="index">
          <span class="from-to">{{ edu.from }} - {{ edu.to }}</span>
          <span class="name">{{ edu.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      education: [
        {
          name: "慶応義塾大学 環境情報学部",
          from: "2009/04",
          to: "2013/03"
        },
        {
          name: "慶應義塾大学院 政策・メディア学科 CIプログラム 修士課程",
          from: "2013/04",
          to: "2015/03"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
section.education {
  .from-to {
    display: block;
    font-size: 14px;
  }

  .name {
    display: block;
    margin-bottom: 8px;
  }
}
</style>
