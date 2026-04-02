/**
 * Static asset URLs keyed as in app-config.json (Vite bundling).
 */
import shape1 from '@/assets/images/shapes/shape1.webp'
import shape2 from '@/assets/images/shapes/shape2.webp'
import shape3 from '@/assets/images/shapes/shape3.webp'
import shape4 from '@/assets/images/shapes/shape4.webp'
import shape5 from '@/assets/images/shapes/shape5.webp'
import shape6 from '@/assets/images/shapes/shape6.webp'
import shape7 from '@/assets/images/shapes/shape7.webp'
import shape8 from '@/assets/images/shapes/shape8.webp'
import shape9 from '@/assets/images/shapes/shape9.webp'
import shape10 from '@/assets/images/shapes/shape10.webp'
import shape11 from '@/assets/images/shapes/shape11.webp'
import shape12 from '@/assets/images/shapes/shape12.webp'
import number1 from '@/assets/images/numbers/number1.svg'
import number2 from '@/assets/images/numbers/number2.svg'
import number3 from '@/assets/images/numbers/number3.svg'
import arrowIcon from '@/assets/images/icons/arrow.svg'
import type { NumberKey, ShapeKey } from '@/types/landing-config'

export const SHAPE_ASSETS: Record<ShapeKey, string> = {
  shape1,
  shape2,
  shape3,
  shape4,
  shape5,
  shape6,
  shape7,
  shape8,
  shape9,
  shape10,
  shape11,
  shape12,
}

export const NUMBER_ASSETS: Record<NumberKey, string> = {
  number1,
  number2,
  number3,
}

export const FOOTER_ASSETS = {
  arrowIcon,
  decorShape: shape12,
} as const
