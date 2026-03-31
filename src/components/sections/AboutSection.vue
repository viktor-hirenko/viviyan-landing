<script setup lang="ts">
const features = [
  {
    icon: 'https://www.figma.com/api/mcp/asset/bde80612-9ca6-4586-a8aa-fbfb5bfbe3a9',
    label: 'Practical thinking',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/0c5d4f0c-20e2-41fd-9ab0-5aae10958337',
    label: 'Structured execution',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/0f3b6a04-d3ba-49dc-b4ae-3e67c0b2c02e',
    label: 'Business focus',
  },
]
</script>

<template>
  <section id="about" class="about">
    <div class="about__container">
      <h2 class="about__title">
        Focus on <span class="about__title--accent">growth</span> — we'll handle the execution.
      </h2>
      <p class="about__description">
        VIVIYAN CORP LIMITED helps businesses turn ideas into working solutions. We combine
        practical thinking, structured execution, and a clear business focus to
        <strong class="about__description--highlight"
          >support companies at different stages of growth.</strong
        >
      </p>
      <div class="about__features">
        <div v-for="feature in features" :key="feature.label" class="about__feature">
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
    max-width: 1048px;
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

  &__title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    color: #faf4f1;

    @media (max-width: 767px) {
      font-size: 32px;
      line-height: 40px;
    }

    &--accent {
      color: #ffcb3c;
    }
  }

  &__description {
    font-family: var(--font-body);
    font-size: 30px;
    font-weight: 300;
    line-height: 40px;
    color: #999;

    @media (max-width: 767px) {
      font-size: 22px;
      line-height: 32px;
    }

    &--highlight {
      font-weight: 400;
      color: #faf4f1;
    }
  }

  &__features {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background-color: #212122;
    border-radius: 100px;
  }

  &__feature-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__feature-label {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 400;
    color: #faf4f1;
    white-space: nowrap;
  }
}
</style>
