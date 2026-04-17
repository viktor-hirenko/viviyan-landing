<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'

const { hero, heroShapes } = useAppConfig()
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__content">
      <h1 class="hero__title">
        {{ hero.titleLine1 }}<br />
        {{ hero.titleLine2 }}
      </h1>
      <p class="hero__subtitle">{{ hero.subtitle }}</p>
      <a :href="hero.ctaMailto" class="hero__mobile-cta">{{ hero.ctaLabel }}</a>
    </div>

    <div class="hero__shapes">
      <div v-for="(src, i) in heroShapes" :key="src" class="hero__shape-container">
        <img
          :src="src"
          alt=""
          class="hero__shape-img"
          :loading="i < 2 ? 'eager' : 'lazy'"
          :fetchpriority="i === 1 ? 'high' : 'auto'"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;

  padding-top: to-rem(220);
  padding-bottom: to-rem(60);

  @include mq($until: tablet) {
    padding-top: to-rem(220);
  }

  @include mq($until: mobile) {
    padding-top: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(40);
    text-align: center;
    width: 100%;
    max-width: to-rem(998);
    padding: 0;
    margin-bottom: to-rem(135);

    @include mq($until: tablet) {
      max-width: to-rem(910);
      margin-bottom: to-rem(134);
    }

    @include mq($until: mobile) {
      padding: to-rem(160) to-rem(16) 0;
      gap: to-rem(20);
      align-items: flex-start;
      text-align: left;
      margin-bottom: to-rem(80);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 800;
    font-size: to-rem(88);
    line-height: to-rem(88);
    color: var(--color-text-primary);

    @include mq($until: tablet) {
      font-size: to-rem(80);
      line-height: to-rem(88);
    }

    @include mq($until: mobile) {
      font-size: to-rem(36);
      line-height: 1.1;
      br {
        display: none;
      }
    }
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: to-rem(24);
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: to-rem(32);

    @include mq($until: mobile) {
      font-size: to-rem(16);
      line-height: to-rem(24);
    }
  }

  &__mobile-cta {
    display: none;
    align-items: center;
    justify-content: center;
    padding: to-rem(16) to-rem(24);
    border-radius: var(--radius-pill);
    background-color: var(--color-accent);
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 600;
    color: var(--color-bg);
    border: none;
    cursor: pointer;
    text-decoration: none;

    @include mq($until: mobile) {
      display: flex;
    }
  }

  &__shapes {
    display: flex;
    max-width: to-rem(1440);
    width: 100%;
    overflow: hidden;
    flex-shrink: 0;

    @include mq($until: mobile) {
      padding: 0 to-rem(12);
    }
  }

  &__shape-container {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(4);
    width: 20%;

    @include mq($until: mobile) {
      display: none;
    }

    /* 3-й и 4-й шейп в ряду (shape3, shape4); 204px при ширине вьюпорта 360 */
    &:nth-child(2),
    &:nth-child(3) {
      @include mq($until: mobile) {
        display: flex;
        flex: 0 0 calc(204 * 100vw / 360);
        width: calc(204 * 100vw / 360);
      }
    }
  }

  &__shape-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }
}
</style>
