<template>
  <header>
    <h1>nekobato</h1>
    <section class="profile">
      <figure>
        <img src="~/assets/images/nekobato.png">
      </figure>
      <span class="handle">{{ profile.handle }}</span>
      <ul class="link-list">
        <li v-for="(link, index) in profile.links" :key="index">
          <a href="{{ link.url }}">
            <span class="{{ link.icon }}"></span>
          </a>
          <span class="link-title">{{ link.title }}</span>
        </li>
      </ul>
    </section>
  </header>
</template>
<script>
export default {
  data() {
    return {
      profile: {
        handle: '猫鳩',
        realname: 'Hayato Koriyama',
        timezone: 'Asia/Tokyo',
        links: [
          {
            title: 'Github : @nekobato',
            icon: 'fab fa-github',
            url: 'https://github.com/nekobato'
          },
          {
            title: 'Twitter : @nekobato',
            icon: 'fab fa-twitter',
            url: 'https://twitter.com/nekobato'
          },
          {
            title: 'E-mail : nekobato@gmail.com',
            icon: 'fas fa-envelope',
            url: 'mailto:nekobato@gmail.com'
          },
          {
            title: 'Telephone : 090.7301.4492',
            icon: 'fas fa-phone',
            url: 'tel:09073014492'
          }
        ]
      }
    }
  }
}
</script>
<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  text-align: left;
  color: #fff;

  h1,
  .profile {
    margin: 0 0 0 40px;
    width: 295px;
    text-align: left;
  }

  h1 {
    font-size: 40px;
    font-weight: 900;
  }

  figure {
    position: absolute;
    top: 0;
    left: -96px;
    margin: 0;
    width: 80px;
    height: 80px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    -webkit-tap-highlight-color: transparent;

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
