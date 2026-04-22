<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  buildLegalInlinePieces,
  type LegalPageType,
} from '@/composables/useLegalCrossLinks'

interface Props {
  text: string
  page: LegalPageType
}

const props = defineProps<Props>()

const pieces = computed(() => buildLegalInlinePieces(props.text, props.page))
</script>

<template>
  <span class="legal__rich">
    <template v-for="(piece, index) in pieces" :key="index">
      <RouterLink
        v-if="piece.kind === 'route'"
        :to="piece.to"
        class="legal__rich-link"
      >
        {{ piece.text }}
      </RouterLink>
      <a
        v-else-if="piece.kind === 'mailto'"
        :href="piece.href"
        class="legal__email"
      >
        {{ piece.text }}
      </a>
      <template v-else>{{ piece.text }}</template>
    </template>
  </span>
</template>

<style scoped lang="scss">
.legal__rich-link,
.legal__email {
  color: var(--color-accent);
  text-decoration: underline;
  font-weight: inherit;

  &:hover {
    text-decoration-thickness: from-font;
  }
}
</style>
