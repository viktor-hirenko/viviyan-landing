<script setup lang="ts">
import { RouterLink } from 'vue-router'

const arrowIcon = 'https://www.figma.com/api/mcp/asset/93905c7b-9951-49ca-8b4b-6a4888f91aa1'
const decorShape = 'https://www.figma.com/api/mcp/asset/9b6fd036-19aa-4c7e-b501-016a679c0b62'
const decorShapeImg = 'https://www.figma.com/api/mcp/asset/8b8c5f1b-ea43-4b6a-bf41-c572cc3193fd'
</script>

<template>
  <footer class="footer">
    <div class="footer__cta">
      <p class="footer__cta-text">Stay aligned with business that moves forward.</p>
      <button class="footer__btn">
        <span class="footer__btn-label">Get in Touch</span>
        <span class="footer__btn-icon" aria-hidden="true">
          <img :src="arrowIcon" alt="" width="24" height="24" />
        </span>
      </button>
    </div>

    <div class="footer__bottom">
      <div class="footer__links">
        <RouterLink to="/privacy-policy" class="footer__link footer__link--underline"
          >Privacy Policy</RouterLink
        >
        <RouterLink to="/terms-and-conditions" class="footer__link footer__link--underline"
          >Terms and Conditions</RouterLink
        >
      </div>
      <span class="footer__copyright">© 2022 VIVIYAN CORP LIMITED. All rights reserved.</span>
    </div>

    <!-- Decorative shape -->
    <div
      class="footer__shape"
      :style="{
        maskImage: `url('${decorShape}')`,
        WebkitMaskImage: `url('${decorShape}')`,
      }"
      aria-hidden="true"
    >
      <img :src="decorShapeImg" alt="" loading="lazy" />
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background-color: #212122;
  padding: 100px 100px 60px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 100px 80px 60px;
  }

  @media (max-width: 767px) {
    padding: 60px 16px 24px;
    gap: 60px;
  }

  &__cta {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 660px;
    position: relative;
    z-index: 1;

    @media (max-width: 767px) {
      max-width: 100%;
      gap: 32px;
    }
  }

  &__cta-text {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    color: #faf4f1;

    @media (max-width: 1024px) {
      font-size: 40px;
      line-height: 48px;
    }

    @media (max-width: 767px) {
      font-size: 32px;
      line-height: 40px;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 4px 4px 4px 20px;
    background-color: #ffcb3c;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    width: fit-content;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }

    @media (max-width: 767px) {
      width: 100%;
      max-width: 215px;
      justify-content: space-between;
    }
  }

  &__btn-label {
    font-family: var(--font-body);
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    color: #111;
    flex: 1;
    min-width: 0;
  }

  &__btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background-color: #212122;
    border-radius: 100px;
    flex-shrink: 0;

    img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
  }

  &__bottom {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;

    @media (max-width: 767px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 40px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }

  &__link {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 500;
    color: #bfbfbf;
    text-decoration: none;
    line-height: 16px;
    transition: color 0.2s ease;

    &:hover {
      color: #faf4f1;
    }

    &--underline {
      text-decoration: underline;
    }
  }

  &__copyright {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 400;
    color: #999;
    line-height: 16px;
  }

  // Decorative shape — positioned right side
  &__shape {
    position: absolute;
    right: 100px;
    top: 45px;
    bottom: 45px;
    aspect-ratio: 316 / 354;
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    overflow: hidden;

    @media (max-width: 1024px) {
      right: 52px;
      top: 75px;
      bottom: 99px;
    }

    @media (max-width: 767px) {
      display: none;
      right: 0;
      top: auto;
      bottom: 0;
      height: 200px;
      aspect-ratio: 316 / 354;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
