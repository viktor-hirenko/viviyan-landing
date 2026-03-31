<script setup lang="ts">
// Gradient shape images from Figma assets
const shapes = [
  {
    gradient: 'https://www.figma.com/api/mcp/asset/eea8297f-fe87-4bdb-921c-fff601ec074f',
    image: 'https://www.figma.com/api/mcp/asset/cec96d97-2eea-49fa-bbd5-2c28413babe3',
  },
  {
    gradient: 'https://www.figma.com/api/mcp/asset/605c5d3f-dc6d-4268-84c9-e156a66baa61',
    image: 'https://www.figma.com/api/mcp/asset/7ec3759d-c47f-4c03-9c93-1a2676598f0b',
  },
  {
    gradient: 'https://www.figma.com/api/mcp/asset/06092cae-1100-4e91-b865-1de58aae991a',
    image: 'https://www.figma.com/api/mcp/asset/7ec3759d-c47f-4c03-9c93-1a2676598f0b',
  },
  {
    gradient: 'https://www.figma.com/api/mcp/asset/28af15f0-bb90-45cf-aed8-fb438acb5d72',
    image: 'https://www.figma.com/api/mcp/asset/86ba9140-2c87-4b24-b1d7-30e4d2beb3a0',
  },
  {
    gradient: 'https://www.figma.com/api/mcp/asset/d165a3e7-e946-40f3-af55-48ff8873e72a',
    image: 'https://www.figma.com/api/mcp/asset/cec96d97-2eea-49fa-bbd5-2c28413babe3',
  },
]

// Mobile shapes (2 visible)
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
      <div v-for="(shape, i) in shapes" :key="i" class="hero__shape-container">
        <div
          class="hero__shape"
          :style="{
            maskImage: `url('${shape.gradient}')`,
            WebkitMaskImage: `url('${shape.gradient}')`,
          }"
        >
          <img :src="shape.image" alt="" class="hero__shape-img" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Mobile: 2 shapes -->
    <div class="hero__shapes hero__shapes--mobile">
      <div v-for="(shape, i) in mobileShapes" :key="i" class="hero__shape-container">
        <div
          class="hero__shape"
          :style="{
            maskImage: `url('${shape.gradient}')`,
            WebkitMaskImage: `url('${shape.gradient}')`,
          }"
        >
          <img :src="shape.image" alt="" class="hero__shape-img" loading="lazy" />
        </div>
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
      // margin-top: 60px;

      @media (max-width: 767px) {
        display: flex;
      }

      .hero__shape-container {
        flex: 1;
        aspect-ratio: 1;
        padding: 0;
      }
    }
  }

  &__shape-container {
    flex: 1;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    overflow: hidden;
  }

  &__shape {
    width: 100%;
    aspect-ratio: 1;
    mask-size: cover;
    -webkit-mask-size: cover;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    overflow: hidden;
    position: relative;
  }

  &__shape-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
