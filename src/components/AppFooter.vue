<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppConfig } from '@/composables/useAppConfig'

const { footer, footerAssets } = useAppConfig()
</script>

<template>
  <footer id="footer" class="footer">
    <div class="footer__inner">
      <div class="footer__cta">
        <p class="footer__cta-text">{{ footer.ctaText }}</p>
        <a :href="footer.ctaMailto" class="footer__btn">
          <span class="footer__btn-label">{{ footer.ctaLabel }}</span>
          <span class="footer__btn-icon" aria-hidden="true">
            <img :src="footerAssets.arrowIcon" alt="" width="24" height="24" />
          </span>
        </a>
      </div>

      <div class="footer__bottom">
        <div class="footer__links">
          <RouterLink
            v-for="link in footer.links"
            :key="link.path"
            :to="link.path"
            class="footer__link footer__link--underline"
          >
            {{ link.label }}
          </RouterLink>
        </div>
        <span class="footer__copyright">{{ footer.copyright }}</span>
      </div>

      <img
        :src="footerAssets.decorShape"
        alt=""
        class="footer__shape"
        aria-hidden="true"
        loading="lazy"
      />
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  scroll-margin-top: to-rem(100);
  background-color: var(--color-surface);

  &__inner {
    max-width: to-rem(1440);
    margin: 0 auto;
    padding: to-rem(100) to-rem(100) to-rem(60);
    display: flex;
    flex-direction: column;
    gap: to-rem(60);
    position: relative;
    overflow: hidden;

    @include mq($until: tablet) {
      padding: to-rem(100) to-rem(80) to-rem(60);
    }

    @include mq($until: mobile) {
      padding: to-rem(60) to-rem(16) to-rem(24);
      gap: to-rem(60);
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    gap: to-rem(32);
    max-width: to-rem(660);
    position: relative;
    z-index: 1;

    @include mq($until: mobile) {
      max-width: 100%;
      gap: to-rem(32);
    }
  }

  &__cta-text {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 700;
    font-size: to-rem(48);
    line-height: to-rem(56);
    color: var(--color-text-primary);

    @include mq($until: tablet) {
      font-size: to-rem(40);
      line-height: to-rem(48);
    }

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: to-rem(12);
    padding: to-rem(4) to-rem(4) to-rem(4) to-rem(20);
    background-color: var(--color-accent);
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    width: fit-content;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }

    @include mq($until: mobile) {
      width: 100%;
      max-width: to-rem(215);
      justify-content: space-between;
    }
  }

  &__btn-label {
    font-family: var(--font-body);
    font-size: to-rem(20);
    line-height: to-rem(24);
    font-weight: 600;
    color: var(--color-bg);
    flex: 1;
    min-width: 0;
  }

  &__btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: to-rem(56);
    height: to-rem(56);
    background-color: var(--color-surface);
    border-radius: var(--radius-pill);
    flex-shrink: 0;

    img {
      width: to-rem(24);
      height: to-rem(24);
      object-fit: contain;
    }
  }

  &__bottom {
    display: flex;
    gap: to-rem(40);
    flex-wrap: wrap;

    @include mq($until: mobile) {
      flex-direction: column;
      gap: to-rem(20);
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: to-rem(40);
    flex-wrap: wrap;
    position: relative;
    z-index: 1;

    @include mq($until: mobile) {
      flex-direction: column;
      align-items: flex-start;
      gap: to-rem(16);
    }
  }

  &__link {
    font-family: var(--font-body);
    font-size: to-rem(14);
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: none;
    line-height: to-rem(16);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-text-primary);
    }

    &--underline {
      text-decoration: underline;
    }
  }

  &__copyright {
    font-family: var(--font-body);
    font-size: to-rem(14);
    font-weight: 400;
    color: var(--color-text-muted);
    line-height: to-rem(16);
  }

  &__shape {
    position: absolute;
    right: to-rem(100);
    top: to-rem(45);
    bottom: to-rem(45);
    width: auto;
    height: calc(100% - #{to-rem(90)});
    object-fit: contain;
    display: block;

    @include mq($until: tablet) {
      right: to-rem(52);
      top: to-rem(75);
      bottom: to-rem(99);
      height: calc(100% - #{to-rem(174)});
    }

    @include mq($until: mobile) {
      display: none;
    }
  }
}
</style>
