<script setup lang="ts">
import { onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import MobileMenu from './MobileMenu.vue'
import { useAppConfig } from '@/composables/useAppConfig'
import { useSectionScrollSpy } from '@/composables/useSectionScrollSpy'

const route = useRoute()
const router = useRouter()
const { header, site, mobileMenu } = useAppConfig()

const isMobileMenuOpen = ref(false)
const burgerRef = ref<HTMLButtonElement | null>(null)

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMenu() {
  isMobileMenuOpen.value = false
  burgerRef.value?.focus()
}

const navItems = header.nav
const activeNavHref = ref<string | null>(null)

function syncActiveNavFromRoute() {
  if (route.path !== '/') {
    activeNavHref.value = null
    return
  }
  activeNavHref.value = route.hash || navItems[0].href
}

watch(() => [route.path, route.hash] as const, syncActiveNavFromRoute, { immediate: true })

useSectionScrollSpy({
  route,
  sectionHrefs: () => navItems.map(item => item.href),
  minSwitchIntervalMs: 110,
  setActiveHref(href) {
    if (route.path !== '/') {
      return
    }
    activeNavHref.value = href
  },
})

function scrollTo(href: string) {
  activeNavHref.value = href

  if (route.path !== '/') {
    void router.push({ path: '/', hash: href })
    return
  }

  const el = document.getElementById(href.replace('#', ''))
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleMobileNavigate(href: string) {
  closeMenu()
  scrollTo(href)
}

watchEffect(() => {
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- Desktop header (centered pill nav) -->
  <header class="header">
    <nav class="header__desktop" :aria-label="header.navAriaLabel">
      <div class="header__nav-pill">
        <RouterLink
          v-for="item in navItems"
          :key="item.label"
          :to="{ path: '/', hash: item.href }"
          class="header__nav-item"
          :class="{ 'header__nav-item--active': activeNavHref === item.href }"
          :aria-current="activeNavHref === item.href ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </div>
      <a :href="header.ctaMailto" class="header__cta">{{ header.ctaLabel }}</a>
    </nav>

    <!-- Mobile header bar -->
    <div class="header__mobile">
      <RouterLink to="/" class="header__logo">{{ site.brandName }}</RouterLink>
      <button
        ref="burgerRef"
        class="header__burger"
        :class="{ 'header__burger--open': isMobileMenuOpen }"
        :aria-label="isMobileMenuOpen ? header.closeMenuAriaLabel : header.openMenuAriaLabel"
        :aria-expanded="isMobileMenuOpen"
        @click="toggleMenu"
      >
        <span class="header__burger-icon" aria-hidden="true">
          <span class="header__burger-line header__burger-line--top"></span>
          <span class="header__burger-line header__burger-line--mid"></span>
          <span class="header__burger-line header__burger-line--bot"></span>
        </span>
      </button>
    </div>
  </header>

  <MobileMenu
    :is-open="isMobileMenuOpen"
    :nav-items="navItems"
    :cta-mailto="header.ctaMailto"
    :menu="mobileMenu"
    @navigate="handleMobileNavigate"
    @close="closeMenu"
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
    gap: to-rem(8);
    position: absolute;
    top: to-rem(24);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;

    @include mq($until: mobile) {
      display: none;
    }
  }

  &__nav-pill {
    display: flex;
    align-items: center;
    gap: to-rem(8);
    padding: to-rem(4);
    background-color: var(--color-surface);
    border-radius: var(--radius-pill);
  }

  &__nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(12) to-rem(16);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 400;
    color: var(--color-text-primary);
    background: transparent;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.35s ease;

    &:hover {
      background-color: var(--color-nav-hover);
    }

    &--active {
      background-color: var(--color-nav-hover);
    }
  }

  &__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(16) to-rem(20);
    border-radius: var(--radius-pill);
    background-color: var(--color-accent);
    font-family: var(--font-body);
    font-size: to-rem(20);
    line-height: to-rem(24);
    font-weight: 600;
    color: var(--color-bg);
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  &__mobile {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: to-rem(16);
    background-color: var(--color-bg);
    border-bottom: to-rem(1) solid var(--color-border);
    position: sticky;
    top: 0;
    backdrop-filter: blur(#{to-rem(10)});

    @include mq($until: mobile) {
      display: flex;
    }
  }

  &__logo {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 500;
    color: var(--color-text-primary);
    text-decoration: none;
  }

  &__burger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: to-rem(48);
    height: to-rem(48);
    background-color: var(--color-surface);
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
  }

  &__burger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: to-rem(18);
    height: to-rem(14);
  }

  &__burger-line {
    display: block;
    height: to-rem(2);
    background-color: var(--color-text-primary);
    border-radius: to-rem(1);
    transform-origin: center;
    transition:
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s ease;

    &--top {
      width: 100%;
    }

    &--mid {
      width: 65%;
      align-self: flex-end;
    }

    &--bot {
      width: 100%;
    }
  }

  &__burger--open {
    .header__burger-line {
      &--top {
        width: 100%;
        transform: translateY(to-rem(6)) rotate(45deg);
      }

      &--mid {
        width: 100%;
        opacity: 0;
        transform: scaleX(0);
      }

      &--bot {
        width: 100%;
        transform: translateY(to-rem(-6)) rotate(-45deg);
      }
    }
  }
}
</style>
