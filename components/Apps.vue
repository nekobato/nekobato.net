<template>
  <section class="apps">
    <h1>Applications / Interfaces</h1>
    <div class="section-content">
      <a class="app-detail" v-for="(app, index) in apps" :key="index" href="{{ app.url }}">
        <span class="name">{{ app.name }}</span>
        <span class="description">{{ app.text }}</span>
      </a>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      apps: [
        {
          name: 'Polidium',
          text: 'Polid Screen Video / Web Player',
          url: 'http://github.com/nekobato/Polidium'
        },
        {
          name: 'Davneko',
          text: 'WebDAV Audio Player',
          url: 'http://github.com/nekobato/Davneko'
        },
        {
          name: 'BookCafe',
          text: 'WebDAV Book Viewer',
          url: 'http://github.com/nekobato/BookCafe'
        },
        {
          name: 'ScrapLinker',
          text: 'Chrome extension to generate Scrapbox links',
          url: 'http://github.com/nekobato/ScrapLinker'
        },
        {
          name: 'Endnanonna',
          text: 'のんのんびより ED GIF Generator',
          url: 'http://github.com/nekobato/endnanonna'
        }
      ]
    }
  }
}
</script>
