<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ValuesSection from '@/components/sections/ValuesSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="home">
    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <ServicesSection />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111;
}
</style>
