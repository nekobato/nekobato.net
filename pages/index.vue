<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { links, me, portfolio } from "../data";
import PortfolioList from "../src/components/PortfolioList.vue";
import ResumeDetails from "../src/components/ResumeDetails.vue";
import { initializePage } from "../src";

let disposePage: (() => void) | undefined;

onMounted(() => {
  disposePage = initializePage();
});

onUnmounted(() => disposePage?.());
</script>

<template>
  <div id="dummy-content" class="dummy-content"></div>
  <canvas id="bg-animation" aria-hidden="true"></canvas>
  <main id="main" class="neubrutalism">
    <header>
      <h1>nekobato.net</h1>
      <p>インターフェースとか</p>
    </header>
    <section class="about">
      <h2>猫鳩</h2>
      <figure class="my-image">
        <img
          src="/images/nekobato.png"
          alt="nekobato avatar image"
          width="120"
          height="120"
        />
      </figure>
      <div class="my-info">
        <dl>
          <dt>ハンドル</dt>
          <dd>{{ me.handle }}</dd>
          <dt>本名</dt>
          <dd>{{ me.name }} ({{ me.nameEn }})</dd>
          <dt>屋号</dt>
          <dd>{{ me.company }}</dd>
          <dt>タイムゾーン</dt>
          <dd>{{ me.timezone }}</dd>
        </dl>
      </div>
    </section>
    <section class="links">
      <h2>リンク</h2>
      <ul>
        <li v-for="link in links" :key="link.href">
          <a
            class="link-button"
            :href="link.href"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="
              link.href.startsWith('http') ? 'noopener noreferrer' : undefined
            "
            >{{ link.label }}</a
          >
        </li>
      </ul>
    </section>
    <section class="portfolio">
      <h2>つくったもの</h2>
      <PortfolioList :items="portfolio.works" />
    </section>
    <section class="portfolio component">
      <h2>つくったコンポーネント</h2>
      <PortfolioList :items="portfolio.components" />
    </section>
    <ResumeDetails />
  </main>
  <footer><small>&copy; 2009-2026 nekobato.net.</small></footer>
</template>
