<script setup lang="ts">
interface NavItem {
  label: string
  href: string
}

interface Props {
  isOpen: boolean
  navItems: NavItem[]
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  navigate: [href: string]
}>()
</script>

<template>
  <Transition name="menu">
    <div
      v-if="isOpen"
      class="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <!-- Header bar -->
      <div class="mobile-menu__header">
        <span class="mobile-menu__logo">Viviyan Corp.</span>
        <button class="mobile-menu__close" aria-label="Close menu" @click="emit('close')">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#faf4f1"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <!-- Navigation content -->
      <div class="mobile-menu__body">
        <nav class="mobile-menu__nav" aria-label="Mobile navigation">
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

        <button class="mobile-menu__cta" @click="emit('navigate', '#services')">
          <span>Get in Touch</span>
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
                stroke="#faf4f1"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: #111;
  display: flex;
  flex-direction: column;
  gap: 48px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #212122;
    background-color: #111;
    backdrop-filter: blur(10px);
    flex-shrink: 0;
  }

  &__logo {
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 500;
    color: #faf4f1;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: #212122;
    border-radius: 100px;
    border: none;
    cursor: pointer;
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    padding: 0 32px 50px;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }

  &__nav-label {
    font-family: var(--font-body);
    font-size: 20px;
    font-weight: 500;
    color: #bfbfbf;
    text-decoration: underline;
    line-height: 24px;
  }

  &__nav-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ffcb3c;
    flex-shrink: 0;
  }

  &__cta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 4px 4px 4px 20px;
    background-color: #ffcb3c;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    color: #111;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  &__cta-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background-color: #212122;
    border-radius: 100px;
    flex-shrink: 0;
  }
}

// Transition
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
