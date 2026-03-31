<script setup lang="ts">
interface ValueItem {
  number: string
  numberImg: string
  icon: string
  iconGradient: string
  title: string
  description: string
}

const values: ValueItem[] = [
  {
    number: '1',
    numberImg: 'https://www.figma.com/api/mcp/asset/a4548134-7a79-456b-a696-d60cf5f1dec1',
    icon: 'https://www.figma.com/api/mcp/asset/4099a147-6124-491e-890a-3d173b634afe',
    iconGradient: 'https://www.figma.com/api/mcp/asset/09fac935-0687-4b56-8ab1-f4ec23eba023',
    title: 'Transparency',
    description:
      'We believe strong work starts with clear communication. No unnecessary complexity, no vague promises — just honest dialogue, realistic planning, and shared understanding at every stage.',
  },
  {
    number: '2',
    numberImg: 'https://www.figma.com/api/mcp/asset/851032bc-1b71-489c-b959-960b5de920b3',
    icon: 'https://www.figma.com/api/mcp/asset/d7f2b20d-3f4a-4f46-9cf9-fad303a37a8a',
    iconGradient: 'https://www.figma.com/api/mcp/asset/4bed72e7-2075-4192-afc3-a0153b8cbbba',
    title: 'Progress',
    description:
      'We value movement, not noise. Step by step, we help businesses improve processes, strengthen operations, and move closer to their goals with confidence.',
  },
  {
    number: '3',
    numberImg: 'https://www.figma.com/api/mcp/asset/a0f87bf6-4028-4c01-ae29-9516daf36009',
    icon: 'https://www.figma.com/api/mcp/asset/4c2c1ccd-a8e2-4edd-8489-f83888e6f739',
    iconGradient: 'https://www.figma.com/api/mcp/asset/e96665dc-05b4-4e08-905e-d6eea8214e48',
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
          <div
            class="values__card-icon"
            :style="{
              maskImage: `url('${value.icon}')`,
              WebkitMaskImage: `url('${value.icon}')`,
            }"
          >
            <img :src="value.iconGradient" :alt="value.title + ' icon'" loading="lazy" />
          </div>
        </div>

        <!-- Number -->
        <div class="values__card-number">
          <img :src="value.numberImg" :alt="value.number" loading="lazy" />
        </div>

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
    mask-size: cover;
    -webkit-mask-size: cover;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    overflow: hidden;
    flex-shrink: 0;

    @media (max-width: 1024px) {
      width: 48px;
      height: 48px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  &__card-number {
    width: 140px;
    height: 140px;
    overflow: hidden;
    flex-shrink: 0;

    @media (max-width: 1024px) {
      width: 120px;
      height: 120px;
    }

    @media (max-width: 767px) {
      width: 120px;
      height: 120px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
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
