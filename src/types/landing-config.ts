/**
 * Shape / number keys referenced from app-config.json (resolved via landing-assets).
 */
export type ShapeKey =
  | 'shape1'
  | 'shape2'
  | 'shape3'
  | 'shape4'
  | 'shape5'
  | 'shape6'
  | 'shape7'
  | 'shape8'
  | 'shape9'
  | 'shape10'
  | 'shape11'
  | 'shape12'

export type NumberKey = 'number1' | 'number2' | 'number3'

export interface NavItemConfig {
  label: string
  href: string
}

export interface SiteMetaConfig {
  title: string
  description: string
  brandName: string
}

export interface HeaderConfig {
  navAriaLabel: string
  ctaLabel: string
  openMenuAriaLabel: string
  closeMenuAriaLabel: string
  ctaMailto: string
  nav: NavItemConfig[]
}

export interface HeroConfig {
  titleLine1: string
  titleLine2: string
  subtitle: string
  ctaLabel: string
  ctaMailto: string
  shapeKeys: ShapeKey[]
}

export interface AboutFeatureConfig {
  label: string
  iconKey: ShapeKey
}

export interface AboutConfig {
  titleBeforeAccent: string
  titleAccent: string
  titleAfterAccent: string
  descriptionLead: string
  descriptionHighlight: string
  features: AboutFeatureConfig[]
}

export interface ServicesConfig {
  label: string
  title: string
  description: string
  shapeKeys: ShapeKey[]
}

export interface ValueCardConfig {
  id: string
  numberKey: NumberKey
  iconKey: ShapeKey
  title: string
  description: string
}

export interface ValuesConfig {
  sectionTitle: string
  sectionSubtitle: string
  cards: ValueCardConfig[]
}

export interface FooterLinkConfig {
  label: string
  path: string
}

export interface FooterConfig {
  ctaText: string
  ctaLabel: string
  ctaMailto: string
  copyright: string
  links: FooterLinkConfig[]
}

export interface MobileMenuConfig {
  dialogAriaLabel: string
  mobileNavAriaLabel: string
  ctaLabel: string
}

export interface AppConfig {
  site: SiteMetaConfig
  header: HeaderConfig
  hero: HeroConfig
  about: AboutConfig
  services: ServicesConfig
  values: ValuesConfig
  footer: FooterConfig
  mobileMenu: MobileMenuConfig
  legal: LegalContentFile
}

export type LegalBlockType = 'text' | 'list' | 'mixed'

export interface LegalSectionConfig {
  title: string
  type: LegalBlockType
  content: string[]
  intro?: string
  introLines?: string[]
  afterList?: string[]
  secondList?: string[]
  afterSecondList?: string[]
  thirdList?: string[]
  afterThirdList?: string[]
  isLastParagraph?: boolean
  isUnnumbered?: boolean
}

export interface LegalPageConfig {
  title: string
  lastUpdated?: string
  intro: string[]
  sections: LegalSectionConfig[]
}

export interface LegalContentFile {
  privacy: LegalPageConfig
  terms: LegalPageConfig
}
