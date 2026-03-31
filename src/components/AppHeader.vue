<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MobileMenu from './MobileMenu.vue'

const isMobileMenuOpen = ref(false)

function openMenu() {
  isMobileMenuOpen.value = true
}

function closeMenu() {
  isMobileMenuOpen.value = false
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Our Values', href: '#values' },
  { label: 'Services', href: '#services' },
]

const activeNavHref = ref<string>(navItems[0].href)

function scrollTo(href: string, setActive = true) {
  if (setActive) {
    activeNavHref.value = href
  }
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleNavClick(href: string) {
  scrollTo(href, true)
}

function handleCtaClick() {
  scrollTo('#services', true)
}
</script>

<template>
  <!-- Desktop header (centered pill nav) -->
  <header class="header">
    <nav class="header__desktop" aria-label="Main navigation">
      <div class="header__nav-pill">
        <button
          v-for="item in navItems"
          :key="item.label"
          type="button"
          class="header__nav-item"
          :class="{ 'header__nav-item--active': activeNavHref === item.href }"
          :aria-current="activeNavHref === item.href ? 'true' : undefined"
          @click="handleNavClick(item.href)"
        >
          {{ item.label }}
        </button>
      </div>
      <button type="button" class="header__cta" @click="handleCtaClick">Get in Touch</button>
    </nav>

    <!-- Mobile header bar -->
    <div class="header__mobile">
      <RouterLink to="/" class="header__logo">Viviyan Corp.</RouterLink>
      <button class="header__burger" aria-label="Open menu" @click="openMenu">
        <span class="header__burger-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="6" width="18" height="2" rx="1" fill="#faf4f1" />
            <rect x="3" y="11" width="18" height="2" rx="1" fill="#faf4f1" />
            <rect x="3" y="16" width="18" height="2" rx="1" fill="#faf4f1" />
          </svg>
        </span>
      </button>
    </div>
  </header>

  <MobileMenu
    :is-open="isMobileMenuOpen"
    :nav-items="navItems"
    @close="closeMenu"
    @navigate="
      href => {
        scrollTo(href, true)
        closeMenu()
      }
    "
  />
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  &__desktop {
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__nav-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px;
    background-color: #212122;
    border-radius: 100px;
  }

  &__nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 400;
    color: #faf4f1;
    background: transparent;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #404040;
    }

    &--active {
      background-color: #404040;
    }
  }

  &__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    border-radius: 100px;
    background-color: #ffcb3c;
    font-family: var(--font-body);
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    color: #111;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  &__mobile {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: #111;
    border-bottom: 1px solid #212122;
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);

    @media (max-width: 767px) {
      display: flex;
    }
  }

  &__logo {
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 500;
    color: #faf4f1;
    text-decoration: none;
  }

  &__burger {
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

  &__burger-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
