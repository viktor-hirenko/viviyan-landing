<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useAppConfig } from '@/composables/useAppConfig'

interface Props {
  type: 'privacy' | 'terms'
}

const props = defineProps<Props>()

const { legal } = useAppConfig()

const content = computed(() =>
  props.type === 'privacy' ? legal.privacy : legal.terms,
)
</script>

<template>
  <div class="legal">
    <AppHeader />
    <main class="legal__main">
      <div class="legal__container">
        <h1 class="legal__title">{{ content.title }}</h1>

        <div class="legal__content">
          <!-- Intro paragraphs -->
          <div class="legal__block">
            <p
              v-for="(para, i) in content.intro"
              :key="i"
              class="legal__text"
            >{{ para }}</p>
          </div>

          <!-- Sections -->
          <div
            v-for="section in content.sections"
            :key="section.title"
            class="legal__block"
          >
            <h2 class="legal__section-title">{{ section.title }}</h2>

            <!-- Plain text -->
            <template v-if="section.type === 'text'">
              <p
                v-for="(para, i) in section.content"
                :key="i"
                class="legal__text"
              >{{ para }}</p>
            </template>

            <!-- Bullet list -->
            <template v-else-if="section.type === 'list'">
              <ul class="legal__list">
                <li
                  v-for="(item, i) in section.content"
                  :key="i"
                  class="legal__list-item"
                >{{ item }}</li>
              </ul>
            </template>

            <!-- Mixed: intro + list or paragraph -->
            <template v-else-if="section.type === 'mixed'">
              <p v-if="section.intro" class="legal__text">{{ section.intro }}</p>
              <template v-if="section.isLastParagraph">
                <p
                  v-for="(item, i) in section.content"
                  :key="i"
                  class="legal__text"
                >
                  <template v-if="item.includes('info@viviyan.co')">
                    {{ item.split('info@viviyan.co')[0] }}<a href="mailto:info@viviyan.co" class="legal__email">info@viviyan.co.</a>
                  </template>
                  <template v-else>{{ item }}</template>
                </p>
              </template>
              <ul v-else class="legal__list">
                <li
                  v-for="(item, i) in section.content"
                  :key="i"
                  class="legal__list-item"
                >{{ item }}</li>
              </ul>
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
      gap: to-rem(40);
    }
  }

  &__title {
    font-family: var(--font-display);
    font-variation-settings: 'opsz' 14, 'wdth' 100;
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
    gap: to-rem(32);

    @include mq($until: mobile) {
      gap: to-rem(20);
    }
  }

  &__section-title {
    font-family: var(--font-display);
    font-variation-settings: 'opsz' 14, 'wdth' 100;
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

    & + & {
      margin-top: to-rem(16);
    }

    @include mq($until: mobile) {
      font-size: to-rem(16);
    }
  }

  &__list {
    list-style: disc;
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
