<script setup lang="ts">
// Hero shapes mapping (Shape1–5, 560×560 RGBA PNG with transparency):
// Shape1 = ring (pink-blue)
// Shape2 = rounded square (pink-yellow)
// Shape3 = S-form (pink-orange)
// Shape4 = blob/ameba (yellow-blue)
// Shape5 = trefoil (pink-blue)
import shape1 from '@/assets/images/shapes/Shape1.png'
import shape2 from '@/assets/images/shapes/Shape2.png'
import shape3 from '@/assets/images/shapes/Shape3.png'
import shape4 from '@/assets/images/shapes/Shape4.png'
import shape5 from '@/assets/images/shapes/Shape5.png'

const shapes = [shape1, shape2, shape3, shape4, shape5]

// Mobile: first 2 shapes only
const mobileShapes = [shapes[0], shapes[1]]
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__content">
      <h1 class="hero__title">
        Build with clarity.<br />
        Grow with confidence.
      </h1>
      <p class="hero__subtitle">Smart solutions for modern business.</p>
      <!-- Mobile CTA button -->
      <button class="hero__mobile-cta">Get in Touch</button>
    </div>

    <!-- Desktop: 5 shapes row -->
    <div class="hero__shapes hero__shapes--desktop">
      <div v-for="(src, i) in shapes" :key="i" class="hero__shape-container">
        <img
          :src="src"
          alt=""
          class="hero__shape-img"
          :loading="i < 2 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
        />
      </div>
    </div>

    <!-- Mobile: 2 shapes -->
    <div class="hero__shapes hero__shapes--mobile">
      <div v-for="(src, i) in mobileShapes" :key="i" class="hero__shape-container">
        <img
          :src="src"
          alt=""
          class="hero__shape-img"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background-color: #111;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;

  // Desktop: padding-top for header + content
  padding-top: 220px;
  padding-bottom: 60px;

  @media (max-width: 1024px) {
    padding-top: 220px;
  }

  @media (max-width: 767px) {
    padding-top: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    text-align: center;
    width: 100%;
    max-width: 998px;
    padding: 0;
    margin-bottom: 135px;

    @media (max-width: 1024px) {
      max-width: 910px;
      margin-bottom: 134px;
    }

    @media (max-width: 767px) {
      padding: 160px 16px 0;
      gap: 20px;
      align-items: flex-start;
      text-align: left;
      margin-bottom: 80px;
    }
  }

  &__title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 800;
    font-size: 88px;
    line-height: 88px;
    color: #faf4f1;

    @media (max-width: 1024px) {
      font-size: 80px;
      line-height: 88px;
    }

    @media (max-width: 767px) {
      font-size: 36px;
      line-height: 1.1;
      br {
        display: none;
      }
    }
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: 24px;
    font-weight: 400;
    color: #bfbfbf;
    line-height: 32px;

    @media (max-width: 767px) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  &__mobile-cta {
    display: none;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    border-radius: 100px;
    background-color: #ffcb3c;
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 600;
    color: #111;
    border: none;
    cursor: pointer;

    @media (max-width: 767px) {
      display: flex;
    }
  }

  // ── Shapes row ──────────────────────────────────────────────────────────────
  &__shapes {
    display: flex;
    width: 100%;

    &--desktop {
      @media (max-width: 767px) {
        display: none;
      }
    }

    &--mobile {
      display: none;
      padding: 0 16px;
      gap: 0;

      @media (max-width: 767px) {
        display: flex;
      }

      .hero__shape-container {
        flex: 1;
        padding: 0;
      }
    }
  }

  &__shape-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    overflow: hidden;
  }

  &__shape-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }
}
</style>
