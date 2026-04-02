import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import { fileURLToPath, URL } from 'node:url'

/**
 * Injects <link rel="preload" as="image"> for the bundled hero LCP asset (shape2.webp).
 * The hashed filename only exists after Rollup emits assets — so this runs in transformIndexHtml (post) with bundle.
 */
function preloadHeroLcpImage(): Plugin {
  return {
    name: 'preload-hero-lcp-image',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) {
          return html
        }
        for (const fileName of Object.keys(bundle)) {
          const item = bundle[fileName]
          if (item.type !== 'asset') {
            continue
          }
          if (/shape2[^/]*\.webp$/i.test(item.fileName)) {
            const href = `/${item.fileName}`
            const link = `    <link rel="preload" as="image" href="${href}" fetchpriority="high" />\n`
            return html.replace(/<\/head>/i, `${link}</head>`)
          }
        }
        return html
      },
    },
  }
}

export default defineConfig({
  plugins: [vue(), preloadHeroLcpImage()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/scss/index.scss" as *;\n`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
