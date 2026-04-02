<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { MobileMenuConfig, NavItemConfig } from '@/types/landing-config'

interface Props {
  isOpen: boolean
  navItems: NavItemConfig[]
  ctaMailto: string
  menu: MobileMenuConfig
}

const props = defineProps<Props>()

const emit = defineEmits<{
  navigate: [href: string]
  close: []
}>()

const dialogRef = ref<HTMLElement | null>(null)

watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      await nextTick()
      dialogRef.value?.focus()
    }
  },
)

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}
</script>

<template>
  <Transition name="menu">
    <div
      v-if="isOpen"
      ref="dialogRef"
      class="mobile-menu"
      role="dialog"
      aria-modal="true"
      :aria-label="menu.dialogAriaLabel"
      tabindex="-1"
      @keydown="handleKeydown"
    >
      <nav class="mobile-menu__nav" :aria-label="menu.mobileNavAriaLabel">
        <button
          v-for="item in navItems"
          :key="item.label"
          class="mobile-menu__nav-item"
          @click="emit('navigate', item.href)"
        >
          <span class="mobile-menu__nav-label">{{ item.label }}</span>
          <span class="mobile-menu__nav-dot" aria-hidden="true"></span>
        </button>
      </nav>

      <a :href="ctaMailto" class="mobile-menu__cta">
        <span>{{ menu.ctaLabel }}</span>
        <span class="mobile-menu__cta-icon" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="var(--color-text-primary)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  top: to-rem(81);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: to-rem(50) to-rem(24) to-rem(56);

  &__nav {
    display: flex;
    flex-direction: column;
    gap: to-rem(32);
  }

  &__nav-item {
    display: flex;
    align-items: center;
    gap: to-rem(12);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }

  &__nav-label {
    font-family: var(--font-body);
    font-size: to-rem(20);
    font-weight: 500;
    color: var(--color-text-secondary);
    text-decoration: underline;
    line-height: to-rem(24);
  }

  &__nav-dot {
    width: to-rem(6);
    height: to-rem(6);
    border-radius: 50%;
    background-color: var(--color-accent);
    flex-shrink: 0;
  }

  &__cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: to-rem(4) to-rem(4) to-rem(4) to-rem(20);
    background-color: var(--color-accent);
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: to-rem(20);
    line-height: to-rem(24);
    font-weight: 600;
    color: var(--color-bg);
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  &__cta-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: to-rem(56);
    height: to-rem(56);
    background-color: var(--color-surface);
    border-radius: var(--radius-pill);
    flex-shrink: 0;
  }
}

// Transition
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
  transform: translateY(-100%);
}
</style>
