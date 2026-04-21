import { execSync } from 'child_process'
import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, relative, resolve } from 'path'

const BUCKET = 'viviyan-co'
const DIST_DIR = 'dist'

function loadEnv() {
  const envPath = resolve('.env')
  if (!existsSync(envPath)) return
  const content = readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    const key = trimmed.slice(0, eqIndex).trim()
    const value = trimmed.slice(eqIndex + 1).trim()
    if (value && !process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnv()

if (!process.env.CLOUDFLARE_API_TOKEN) {
  console.error('\n✗ CLOUDFLARE_API_TOKEN не задан. Заполни .env файл.\n')
  process.exit(1)
}

if (!process.env.CLOUDFLARE_ACCOUNT_ID) {
  console.error('\n✗ CLOUDFLARE_ACCOUNT_ID не задан. Заполни .env файл.\n')
  process.exit(1)
}

const MIME_TYPES = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
  txt: 'text/plain; charset=utf-8',
  xml: 'application/xml',
}

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  return MIME_TYPES[ext] || 'application/octet-stream'
}

function getAllFiles(dir, base = dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath, base))
    } else {
      files.push({ fullPath, key: relative(base, fullPath) })
    }
  }
  return files
}

if (!existsSync(DIST_DIR)) {
  console.error(`\n✗ Папка "${DIST_DIR}" не найдена. Сначала выполни npm run build.\n`)
  process.exit(1)
}

const files = getAllFiles(DIST_DIR)
console.log(`\nЗагружаем ${files.length} файлов в бакет "${BUCKET}"...\n`)

let uploaded = 0
for (const { fullPath, key } of files) {
  const mime = getMimeType(key)
  try {
    execSync(
      `npx wrangler r2 object put "${BUCKET}/${key}" --file "${fullPath}" --content-type "${mime}" --remote`,
      { stdio: 'inherit', env: process.env }
    )
    uploaded++
    console.log(`  ✓ [${uploaded}/${files.length}] ${key}`)
  } catch (e) {
    console.error(`\n  ✗ Ошибка при загрузке ${key}`)
    process.exit(1)
  }
}

console.log(`\n✓ Деплой завершён! Загружено ${uploaded} файлов.`)
console.log('Проверяй: https://viviyan.co\n')
