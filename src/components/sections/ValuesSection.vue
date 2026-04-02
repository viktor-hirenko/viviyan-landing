<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'

const { values, valueCards } = useAppConfig()
</script>

<template>
  <section id="values" class="values">
    <div class="values__header">
      <h2 class="values__title">{{ values.sectionTitle }}</h2>
      <p class="values__subtitle">{{ values.sectionSubtitle }}</p>
    </div>

    <div class="values__grid">
      <article v-for="value in valueCards" :key="value.id" class="values__card">
        <!-- Icon top-right -->
        <div class="values__card-top">
          <img
            :src="value.iconImg"
            :alt="value.title + ' icon'"
            class="values__card-icon"
            loading="lazy"
          />
        </div>

        <!-- Number (Figma 1-480) -->
        <div class="values__card-number">
          <img
            :src="value.numberImg"
            :alt="value.number"
            class="values__card-number-img"
            width="140"
            height="140"
            loading="lazy"
          />
        </div>

        <!-- Text -->
        <div class="values__card-text">
          <h3 class="values__card-title">{{ value.title }}</h3>
          <p class="values__card-description">{{ value.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.values {
  background-color: var(--color-bg);
  padding: to-rem(100);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: to-rem(60);

  @include mq($until: tablet) {
    padding: to-rem(100) to-rem(40);
  }

  @include mq($until: mobile) {
    padding: to-rem(60) to-rem(16);
    gap: to-rem(50);
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(16);
    text-align: center;
    max-width: to-rem(1048);
    width: 100%;

    @include mq($until: mobile) {
      align-items: flex-start;
      text-align: left;
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
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: to-rem(24);
    font-weight: 400;
    line-height: to-rem(32);
    color: var(--color-text-secondary);

    @include mq($until: mobile) {
      font-size: to-rem(16);
      line-height: to-rem(24);
    }
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: to-rem(20);
    width: 100%;
    max-width: to-rem(1240);

    @include mq($until: tablet) {
      gap: to-rem(16);
    }

    @include mq($until: mobile) {
      flex-direction: column;
      gap: to-rem(16);
    }
  }

  &__card {
    flex: 1;
    background-color: var(--color-surface);
    border-radius: var(--radius-card);
    padding: to-rem(32);
    display: flex;
    max-width: to-rem(400);
    min-width: to-rem(330);
    flex-direction: column;
    gap: to-rem(16);

    @include mq($until: tablet) {
      padding: to-rem(24);
    }

    @include mq($until: mobile) {
      max-width: 100%;
      min-width: 100%;
      padding: to-rem(24);
    }
  }

  &__card-top {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  &__card-icon {
    width: to-rem(60);
    height: to-rem(60);
    object-fit: contain;
    display: block;
    flex-shrink: 0;

    @include mq($until: tablet) {
      width: to-rem(48);
      height: to-rem(48);
    }
  }

  &__card-number {
    width: to-rem(140);
    height: to-rem(140);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;

    @include mq($until: tablet) {
      width: to-rem(120);
      height: to-rem(120);
    }

    @include mq($until: mobile) {
      width: to-rem(120);
      height: to-rem(120);
    }
  }

  &__card-number-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: left center;
    display: block;
  }

  &__card-text {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);
  }

  &__card-title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 500;
    font-size: to-rem(40);
    line-height: to-rem(48);
    color: var(--color-text-primary);

    @include mq($until: tablet) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }
  }

  &__card-description {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 400;
    line-height: to-rem(24);
    color: var(--color-text-secondary);

    @include mq($until: mobile) {
      font-size: to-rem(16);
    }
  }
}
</style>
