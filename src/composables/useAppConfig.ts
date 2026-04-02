import { computed } from 'vue'
import appConfigRaw from '@/data/app-config.json'
import { FOOTER_ASSETS, NUMBER_ASSETS, SHAPE_ASSETS } from '@/data/landing-assets'
import type { AppConfig } from '@/types/landing-config'

const appConfig = appConfigRaw as AppConfig

/**
 * Landing copy from `src/data/app-config.json` plus resolved image URLs.
 */
export function useAppConfig() {
  const heroShapes = computed(() => appConfig.hero.shapeKeys.map(k => SHAPE_ASSETS[k]))

  const aboutFeatures = computed(() =>
    appConfig.about.features.map(f => ({
      label: f.label,
      icon: SHAPE_ASSETS[f.iconKey],
    })),
  )

  const servicesShapes = computed(() => appConfig.services.shapeKeys.map(k => SHAPE_ASSETS[k]))

  const valueCards = computed(() =>
    appConfig.values.cards.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      number: c.numberKey.replace('number', ''),
      numberImg: NUMBER_ASSETS[c.numberKey],
      iconImg: SHAPE_ASSETS[c.iconKey],
    })),
  )

  return {
    config: appConfig,
    site: appConfig.site,
    header: appConfig.header,
    hero: appConfig.hero,
    heroShapes,
    about: appConfig.about,
    aboutFeatures,
    services: appConfig.services,
    servicesShapes,
    values: appConfig.values,
    valueCards,
    footer: appConfig.footer,
    footerAssets: FOOTER_ASSETS,
    mobileMenu: appConfig.mobileMenu,
    legal: appConfig.legal,
  }
}

export function getAppConfig(): AppConfig {
  return appConfig
}
