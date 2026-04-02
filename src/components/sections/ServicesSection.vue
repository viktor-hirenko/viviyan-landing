<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'

const { services, servicesShapes } = useAppConfig()
</script>

<template>
  <section id="services" class="services">
    <div class="services__container">
      <div class="services__header">
        <span class="services__label">{{ services.label }}</span>
        <h2 class="services__title">
          {{ services.title }}
        </h2>
      </div>

      <p class="services__description">
        {{ services.description }}
      </p>

      <div class="services__shapes">
        <img
          v-for="(src, i) in servicesShapes"
          :key="i"
          :src="src"
          alt=""
          class="services__shape"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.services {
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
    max-width: to-rem(1064);
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

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(24);
    width: 100%;

    @include mq($until: mobile) {
      align-items: flex-start;
      gap: to-rem(16);
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(12) to-rem(16);
    background-color: var(--color-surface);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 500;
    color: var(--color-text-primary);
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
    max-width: to-rem(848);

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }
  }

  &__description {
    font-family: var(--font-body);
    font-size: to-rem(30);
    font-weight: 300;
    line-height: to-rem(40);
    color: var(--color-text-muted);

    @include mq($until: mobile) {
      font-size: to-rem(18);
      line-height: to-rem(28);
    }
  }

  &__shapes {
    display: flex;
    align-items: center;
    gap: to-rem(24);

    @include mq($until: mobile) {
      gap: to-rem(16);
    }
  }

  &__shape {
    width: to-rem(60);
    height: to-rem(60);
    object-fit: contain;
    display: block;
    flex-shrink: 0;

    @include mq($until: mobile) {
      width: to-rem(48);
      height: to-rem(48);
    }
  }
}
</style>
