<script setup lang="ts">
// Services decorative shapes mapping (120×120 RGBA PNG):
// Shape8  = 4-pointed star (multicolor)
// Shape9  = 3 bubbles stacked (blue-pink)
// Shape10 = flower/blob (pink-orange)
import shape8 from '@/assets/images/shapes/Shape8.png'
import shape9 from '@/assets/images/shapes/Shape9.png'
import shape10 from '@/assets/images/shapes/Shape10.png'

const decorShapes = [shape8, shape9, shape10]
</script>

<template>
  <section id="services" class="services">
    <div class="services__container">
      <div class="services__header">
        <span class="services__label">Services</span>
        <h2 class="services__title">
          We provide the support businesses need to operate and grow better.
        </h2>
      </div>

      <p class="services__description">
        Business moves fast, and strong execution matters. VIVIYAN CORP LIMITED offers practical
        support and tailored solutions that help companies improve workflows, strengthen delivery,
        and work with more confidence.
      </p>

      <div class="services__shapes">
        <img
          v-for="(src, i) in decorShapes"
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
  background-color: #111;
  padding: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    padding: 100px 80px;
  }

  @media (max-width: 767px) {
    padding: 60px 16px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    max-width: 1064px;
    width: 100%;
    text-align: center;

    @media (max-width: 1024px) {
      max-width: 864px;
    }

    @media (max-width: 767px) {
      align-items: flex-start;
      text-align: left;
      gap: 50px;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;

    @media (max-width: 767px) {
      align-items: flex-start;
      gap: 16px;
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    background-color: #212122;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 500;
    color: #faf4f1;
  }

  &__title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    color: #faf4f1;
    max-width: 848px;

    @media (max-width: 767px) {
      font-size: 32px;
      line-height: 40px;
    }
  }

  &__description {
    font-family: var(--font-body);
    font-size: 30px;
    font-weight: 300;
    line-height: 40px;
    color: #999;

    @media (max-width: 767px) {
      font-size: 18px;
      line-height: 28px;
    }
  }

  &__shapes {
    display: flex;
    align-items: center;
    gap: 24px;

    @media (max-width: 767px) {
      gap: 16px;
    }
  }

  &__shape {
    width: 60px;
    height: 60px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;

    @media (max-width: 767px) {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
