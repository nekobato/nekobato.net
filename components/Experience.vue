<template>
  <section class="experience">
    <h1>Experience</h1>
    <div class="section-content">
      <ul class="experience-list">
        <li v-for="(ex, index) in experience" :key="index">
          <span class="from-to">{{ ex.from }} - {{ ex.to }}</span>
          <span class="name">{{ ex.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      experience: [
        {
          name: '株式会社 U-NOTE - 業務委託エンジニア',
          from: '2012/04',
          to: '2015/03'
        },
        {
          name: '株式会社 U-NOTE - 業務委託エンジニア',
          from: '2017/01',
          to: 'now'
        },
        {
          name: '株式会社 モバイルファクトリー - フロントエンドエンジニア',
          from: '2015/04',
          to: '2018/06'
        },
        {
          name: '株式会社 メルカリ - フロントエンドエンジニア',
          from: '2018/07',
          to: 'now'
        }
      ]
    }
  }
}
</script>
