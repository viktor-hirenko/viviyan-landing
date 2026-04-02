<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'

const { about, aboutFeatures } = useAppConfig()
</script>

<template>
  <section id="about" class="about">
    <div class="about__container">
      <h2 class="about__title">
        {{ about.titleBeforeAccent }}<span class="about__title--accent">{{ about.titleAccent }}</span>{{ about.titleAfterAccent }}
      </h2>
      <p class="about__description">
        {{ about.descriptionLead }}
        <strong class="about__description--highlight">{{ about.descriptionHighlight }}</strong>
      </p>
      <div class="about__features">
        <div v-for="feature in aboutFeatures" :key="feature.label" class="about__feature">
          <span class="about__feature-icon" aria-hidden="true">
            <img :src="feature.icon" :alt="feature.label" width="20" height="20" loading="lazy" />
          </span>
          <span class="about__feature-label">{{ feature.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  background-color: var(--color-bg);
  padding: to-rem(100);
  display: flex;
  align-items: center;
  justify-content: center;

  @include mq($until: tablet) {
    padding: to-rem(100) to-rem(80);
  }

  @include mq($until: mobile) {
    padding: to-rem(60) to-rem(16);
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(50);
    max-width: to-rem(1048);
    width: 100%;
    text-align: center;

    @include mq($until: tablet) {
      max-width: to-rem(864);
    }

    @include mq($until: mobile) {
      align-items: flex-start;
      text-align: left;
      gap: to-rem(50);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 700;
    font-size: to-rem(48);
    line-height: to-rem(56);
    color: var(--color-text-primary);

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }

    &--accent {
      color: var(--color-accent);
    }
  }

  &__description {
    font-family: var(--font-body);
    font-size: to-rem(30);
    font-weight: 300;
    line-height: to-rem(40);
    color: var(--color-text-muted);

    @include mq($until: mobile) {
      font-size: to-rem(22);
      line-height: to-rem(32);
    }

    &--highlight {
      font-weight: 400;
      color: var(--color-text-primary);
    }
  }

  &__features {
    display: flex;
    align-items: center;
    gap: to-rem(12);
    flex-wrap: wrap;
    justify-content: center;

    @include mq($until: mobile) {
      flex-direction: column;
      align-items: flex-start;
      gap: to-rem(8);
    }
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: to-rem(8);
    padding: to-rem(12) to-rem(16);
    background-color: var(--color-surface);
    border-radius: var(--radius-pill);
  }

  &__feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: to-rem(20);
    height: to-rem(20);
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__feature-label {
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 400;
    color: var(--color-text-primary);
    white-space: nowrap;
  }
}
</style>
