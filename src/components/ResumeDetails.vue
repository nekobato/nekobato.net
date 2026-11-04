<script setup lang="ts">
import { activities, resume } from "../../data";
</script>

<template>
  <details class="social-details">
    <summary class="social-summary">
      <div class="summary-content">
        <span class="summary-text">経歴</span>
        <img class="chevron down" src="/icons/chevron-down.svg" alt="" />
        <img class="chevron up" src="/icons/chevron-up.svg" alt="" />
      </div>
    </summary>

    <section class="activities">
      <h2>活動履歴</h2>
      <dl>
        <template v-for="activity in activities" :key="activity.title">
          <dt>{{ activity.term }}</dt>
          <dd>
            <a
              v-if="activity.url"
              :href="activity.url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ activity.title }}</a
            >
            <template v-else>{{ activity.title }}</template>
          </dd>
        </template>
      </dl>
    </section>

    <hr />
    <section class="resume-education social-info">
      <h2>学歴</h2>
      <ul class="education-list">
        <li v-for="education in resume.educations" :key="education.startDate">
          <span class="term"
            >{{ education.startDate }} - {{ education.endDate }}</span
          >
          <div class="title">
            <span class="institution">{{ education.institution }}</span>
            <span class="area">{{ education.area }}</span>
            <span class="study-type">({{ education.studyType }})</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="resume-experience social-info">
      <h2>職歴</h2>
      <ul class="experience-list">
        <li
          v-for="experience in resume.experiences"
          :key="experience.startDate"
        >
          <span class="term"
            >{{ experience.startDate }} - {{ experience.endDate }}</span
          >
          <span class="title"
            >{{ experience.company }}（{{ experience.role }})</span
          >
          <div
            v-for="project in experience.projects"
            :key="`${project.name}-${project.startDate}`"
            class="project"
          >
            <span class="project-term"
              >{{ project.startDate }} - {{ project.endDate }}</span
            >
            <span class="project-name">{{ project.name }}</span>
            <div class="highlights">
              <span
                v-for="highlight in project.highlights"
                :key="highlight"
                class="highlight"
                >{{ highlight }}</span
              >
            </div>
          </div>
          <span></span>
        </li>
      </ul>
    </section>
  </details>
</template>
