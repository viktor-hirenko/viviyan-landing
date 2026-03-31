<script setup lang="ts">
// Values icons mapping (120×120 RGBA PNG):
// Shape6  = 4-petal flower (pink-yellow)   → Transparency
// Shape7  = S-form (yellow-green)           → Progress
// Shape11 = 4-pointed star (blue-pink)      → Partnership
//
// NOTE: Number images (1, 2, 3) were not exported to shapes folder.
// Numbers are rendered as styled text with CSS gradient to match the design intent.
import shape6 from '@/assets/images/shapes/Shape6.png'
import shape7 from '@/assets/images/shapes/Shape7.png'
import shape11 from '@/assets/images/shapes/Shape11.png'

interface ValueItem {
  number: string
  iconImg: string
  title: string
  description: string
}

const values: ValueItem[] = [
  {
    number: '1',
    iconImg: shape6,
    title: 'Transparency',
    description:
      'We believe strong work starts with clear communication. No unnecessary complexity, no vague promises — just honest dialogue, realistic planning, and shared understanding at every stage.',
  },
  {
    number: '2',
    iconImg: shape7,
    title: 'Progress',
    description:
      'We value movement, not noise. Step by step, we help businesses improve processes, strengthen operations, and move closer to their goals with confidence.',
  },
  {
    number: '3',
    iconImg: shape11,
    title: 'Partnership',
    description:
      'We do not see cooperation as a formal process. We build long-term relationships based on trust, responsibility, and a real commitment to the people we work with.',
  },
]
</script>

<template>
  <section id="values" class="values">
    <div class="values__header">
      <h2 class="values__title">Our values</h2>
      <p class="values__subtitle">Our values shape how we work on daily basis</p>
    </div>

    <div class="values__grid">
      <article v-for="value in values" :key="value.title" class="values__card">
        <!-- Icon top-right -->
        <div class="values__card-top">
          <img
            :src="value.iconImg"
            :alt="value.title + ' icon'"
            class="values__card-icon"
            loading="lazy"
          />
        </div>

        <!-- Number rendered as gradient text -->
        <div class="values__card-number" aria-hidden="true">{{ value.number }}</div>

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
  background-color: #111;
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    padding: 100px 40px;
  }

  @media (max-width: 767px) {
    padding: 60px 16px;
    gap: 50px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
    max-width: 1048px;
    width: 100%;

    @media (max-width: 767px) {
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
    font-size: 48px;
    line-height: 56px;
    color: #faf4f1;

    @media (max-width: 767px) {
      font-size: 32px;
      line-height: 40px;
    }
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    color: #bfbfbf;

    @media (max-width: 767px) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1240px;

    @media (max-width: 1024px) {
      gap: 16px;
    }

    @media (max-width: 767px) {
      flex-direction: column;
      gap: 16px;
    }
  }

  &__card {
    flex: 1;
    background-color: #212122;
    border-radius: 32px;
    padding: 32px;
    display: flex;
    max-width: 400px;
    min-width: 330px;
    flex-direction: column;
    gap: 16px;

    @media (max-width: 1024px) {
      padding: 24px;
    }

    @media (max-width: 767px) {
      max-width: 100%;
      padding: 24px;
    }
  }

  &__card-top {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  &__card-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
    display: block;
    flex-shrink: 0;

    @media (max-width: 1024px) {
      width: 48px;
      height: 48px;
    }
  }

  &__card-number {
    width: 140px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-shrink: 0;
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 800;
    font-size: 120px;
    line-height: 1;
    // Gradient text effect matching the design palette
    background: linear-gradient(135deg, #ff6b6b 0%, #ff9f43 40%, #a29bfe 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 1024px) {
      width: 120px;
      height: 120px;
      font-size: 100px;
    }

    @media (max-width: 767px) {
      width: 120px;
      height: 120px;
      font-size: 100px;
    }
  }

  &__card-text {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__card-title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 500;
    font-size: 40px;
    line-height: 48px;
    color: #faf4f1;

    @media (max-width: 1024px) {
      font-size: 32px;
      line-height: 40px;
    }

    @media (max-width: 767px) {
      font-size: 32px;
      line-height: 40px;
    }
  }

  &__card-description {
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    color: #bfbfbf;

    @media (max-width: 767px) {
      font-size: 16px;
    }
  }
}
</style>
