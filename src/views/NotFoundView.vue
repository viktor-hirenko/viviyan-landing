<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="not-found">
    <AppHeader />
    <main class="not-found__main">
      <p class="not-found__code">404</p>
      <h1 class="not-found__title">Page not found</h1>
      <p class="not-found__text">The page you're looking for doesn't exist.</p>
      <RouterLink to="/" class="not-found__link">Back to Home</RouterLink>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-bg);

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: to-rem(16);
    padding: to-rem(160) to-rem(16) to-rem(100);
    text-align: center;
  }

  &__code {
    font-family: var(--font-display);
    font-variation-settings: 'opsz' 14, 'wdth' 100;
    font-weight: 700;
    font-size: to-rem(120);
    line-height: 1;
    color: var(--color-surface);

    @include mq($until: mobile) {
      font-size: to-rem(80);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-variation-settings: 'opsz' 14, 'wdth' 100;
    font-weight: 700;
    font-size: to-rem(48);
    line-height: to-rem(56);
    color: var(--color-text-primary);

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }
  }

  &__text {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 300;
    color: var(--color-text-secondary);
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: to-rem(8);
    padding: to-rem(16) to-rem(32);
    border-radius: var(--radius-pill);
    background-color: var(--color-accent);
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 600;
    color: var(--color-bg);
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
