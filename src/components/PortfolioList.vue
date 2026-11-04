<script setup lang="ts">
import type { PortfolioItem } from "../../data";

defineProps<{ items: PortfolioItem[] }>();
</script>

<template>
  <div class="app">
    <ul class="card-list">
      <li v-for="item in items" :key="item.url" class="neubrutalism-card">
        <div class="title">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">{{
            item.title
          }}</a>
        </div>
        <!-- descriptionHtml is trusted HTML authored in data/portfolio.json. -->
        <p
          v-if="item.descriptionHtml"
          class="description"
          v-html="item.descriptionHtml"
        ></p>
        <p v-else-if="item.description" class="description">
          {{ item.description }}
        </p>
        <div class="badges">
          <img
            v-for="badge in item.badges"
            :key="badge.src"
            class="badge"
            :alt="badge.alt"
            :src="badge.src"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
