<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LegalRichText from '@/components/LegalRichText.vue'
import { useAppConfig } from '@/composables/useAppConfig'

interface Props {
  type: 'privacy' | 'terms'
}

const props = defineProps<Props>()

const { legal } = useAppConfig()

const content = computed(() => (props.type === 'privacy' ? legal.privacy : legal.terms))

function getSectionNumber(sections: typeof content.value.sections, index: number): number {
  let count = 0
  for (let i = 0; i <= index; i++) {
    if (!sections[i].isUnnumbered) count++
  }
  return count
}
</script>

<template>
  <div class="legal">
    <AppHeader />
    <main class="legal__main">
      <div class="legal__container">
        <div class="legal__header">
          <h1 class="legal__title">{{ content.title }}</h1>
          <p v-if="content.lastUpdated" class="legal__last-updated">{{ content.lastUpdated }}</p>
        </div>

        <div class="legal__content">
          <!-- Intro paragraphs -->
          <div class="legal__block">
            <p v-for="(para, i) in content.intro" :key="i" class="legal__text">
              <LegalRichText :text="para" :page="props.type" />
            </p>
          </div>

          <!-- Sections -->
          <div
            v-for="(section, sectionIndex) in content.sections"
            :key="section.title"
            class="legal__block"
          >
            <h2 class="legal__section-title">
              <template v-if="!section.isUnnumbered"
                >{{ getSectionNumber(content.sections, sectionIndex) }}. </template
              >{{ section.title }}
            </h2>

            <!-- Plain text -->
            <template v-if="section.type === 'text'">
              <p v-for="(para, i) in section.content" :key="i" class="legal__text">
                <LegalRichText :text="para" :page="props.type" />
              </p>
            </template>

            <!-- Bullet list -->
            <template v-else-if="section.type === 'list'">
              <ul class="legal__list">
                <li v-for="(item, i) in section.content" :key="i" class="legal__list-item">
                  <LegalRichText :text="item" :page="props.type" />
                </li>
              </ul>
            </template>

            <!-- Mixed: intro + list or paragraph -->
            <template v-else-if="section.type === 'mixed'">
              <template v-if="section.introLines">
                <p
                  v-for="(line, li) in section.introLines"
                  :key="'intro-' + li"
                  class="legal__text"
                >
                  <LegalRichText :text="line" :page="props.type" />
                </p>
              </template>
              <p v-else-if="section.intro" class="legal__text">
                <LegalRichText :text="section.intro" :page="props.type" />
              </p>

              <template v-if="section.isLastParagraph">
                <p v-for="(item, i) in section.content" :key="i" class="legal__text">
                  <LegalRichText :text="item" :page="props.type" />
                </p>
              </template>
              <ul v-else class="legal__list">
                <li v-for="(item, i) in section.content" :key="i" class="legal__list-item">
                  <LegalRichText :text="item" :page="props.type" />
                </li>
              </ul>

              <template v-if="section.afterList">
                <p v-for="(para, i) in section.afterList" :key="'after-' + i" class="legal__text">
                  <LegalRichText :text="para" :page="props.type" />
                </p>
              </template>

              <ul v-if="section.secondList" class="legal__list">
                <li
                  v-for="(item, i) in section.secondList"
                  :key="'second-' + i"
                  class="legal__list-item"
                >
                  <LegalRichText :text="item" :page="props.type" />
                </li>
              </ul>

              <template v-if="section.afterSecondList">
                <p
                  v-for="(para, i) in section.afterSecondList"
                  :key="'aftersecond-' + i"
                  class="legal__text"
                >
                  <LegalRichText :text="para" :page="props.type" />
                </p>
              </template>

              <ul v-if="section.thirdList" class="legal__list">
                <li
                  v-for="(item, i) in section.thirdList"
                  :key="'third-' + i"
                  class="legal__list-item"
                >
                  <LegalRichText :text="item" :page="props.type" />
                </li>
              </ul>

              <template v-if="section.afterThirdList">
                <p
                  v-for="(para, i) in section.afterThirdList"
                  :key="'afterthird-' + i"
                  class="legal__text"
                >
                  <LegalRichText :text="para" :page="props.type" />
                </p>
              </template>
            </template>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.legal {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-bg);

  &__main {
    flex: 1;
    padding: to-rem(160) to-rem(200) to-rem(100);

    @include mq($until: tablet) {
      padding: to-rem(120) to-rem(80) to-rem(80);
    }

    @include mq($until: mobile) {
      padding: to-rem(100) to-rem(16) to-rem(60);
    }
  }

  &__container {
    max-width: to-rem(1040);
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: to-rem(80);

    @include mq($until: tablet) {
      gap: to-rem(60);
    }

    @include mq($until: mobile) {
      gap: to-rem(50);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 700;
    font-size: to-rem(64);
    line-height: to-rem(80);
    color: var(--color-text-primary);
    text-align: center;

    @include mq($until: tablet) {
      font-size: to-rem(48);
      line-height: to-rem(56);
    }

    @include mq($until: mobile) {
      font-size: to-rem(36);
      line-height: to-rem(44);
      text-align: left;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(12);

    @include mq($until: mobile) {
      align-items: flex-start;
    }
  }

  &__last-updated {
    font-family: var(--font-body);
    font-size: to-rem(14);
    font-weight: 300;
    line-height: to-rem(20);
    color: var(--color-text-secondary);
    text-align: center;
    opacity: 0.6;

    @include mq($until: mobile) {
      text-align: left;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: to-rem(64);

    @include mq($until: mobile) {
      gap: to-rem(40);
    }
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);
  }

  &__section-title {
    font-family: var(--font-display);
    font-variation-settings:
      'opsz' 14,
      'wdth' 100;
    font-weight: 700;
    font-size: to-rem(40);
    line-height: to-rem(48);
    color: var(--color-text-primary);

    @include mq($until: tablet) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }

    @include mq($until: mobile) {
      font-size: to-rem(24);
      line-height: to-rem(32);
    }
  }

  &__text {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 300;
    line-height: to-rem(24);
    color: var(--color-text-secondary);

    @include mq($until: mobile) {
      font-size: to-rem(16);
    }
  }

  &__list {
    list-style: lower-alpha;
    padding-left: to-rem(27);
    display: flex;
    flex-direction: column;
    gap: to-rem(8);
  }

  &__list-item {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 300;
    line-height: to-rem(24);
    color: var(--color-text-secondary);

    @include mq($until: mobile) {
      font-size: to-rem(16);
    }
  }

  &__email {
    color: var(--color-accent);
    text-decoration: underline;
  }
}
</style>
