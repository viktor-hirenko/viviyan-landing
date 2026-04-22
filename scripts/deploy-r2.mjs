import { execSync } from 'child_process'
import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join, relative, resolve } from 'path'
import { getMimeType } from '../shared/mime-types.mjs'

const BUCKET = 'viviyan-co'
const DIST_DIR = 'dist'
const CONCURRENCY = 5

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

const CF_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const CF_ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID

if (!CF_TOKEN) {
  console.error('\n✗ CLOUDFLARE_API_TOKEN не задан. Заполни .env файл.\n')
  process.exit(1)
}

if (!CF_ACCOUNT) {
  console.error('\n✗ CLOUDFLARE_ACCOUNT_ID не задан. Заполни .env файл.\n')
  process.exit(1)
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

async function listR2Objects() {
  const allKeys = []
  let cursor = ''
  let hasMore = true

  while (hasMore) {
    const params = new URLSearchParams({ limit: '1000' })
    if (cursor) params.set('cursor', cursor)

    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT}/r2/buckets/${BUCKET}/objects?${params}`,
      { headers: { Authorization: `Bearer ${CF_TOKEN}` } }
    )

    if (!res.ok) {
      console.warn('  ⚠ Не удалось получить список объектов R2, пропускаем очистку.')
      return null
    }

    const json = await res.json()
    const objects = json.result?.objects ?? json.result ?? []
    for (const obj of objects) {
      allKeys.push(obj.key)
    }

    cursor = json.result_info?.cursor ?? json.result?.truncated ? json.result?.cursor : ''
    hasMore = !!cursor
  }

  return allKeys
}

async function deleteR2Objects(keys) {
  let deleted = 0
  for (const key of keys) {
    try {
      execSync(
        `npx wrangler r2 object delete "${BUCKET}/${key}" --remote`,
        { stdio: 'pipe', env: process.env }
      )
      deleted++
      console.log(`  ✓ удалён: ${key}`)
    } catch {
      console.warn(`  ✗ не удалось удалить: ${key}`)
    }
  }
  return deleted
}

function uploadFile(fullPath, key) {
  const mime = getMimeType(key)
  execSync(
    `npx wrangler r2 object put "${BUCKET}/${key}" --file "${fullPath}" --content-type "${mime}" --remote`,
    { stdio: 'inherit', env: process.env }
  )
}

async function uploadBatch(files) {
  let uploaded = 0
  const total = files.length

  for (let i = 0; i < total; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY)
    const results = await Promise.allSettled(
      batch.map(({ fullPath, key }) =>
        new Promise((resolve, reject) => {
          try {
            uploadFile(fullPath, key)
            resolve(key)
          } catch {
            reject(key)
          }
        })
      )
    )

    for (const result of results) {
      if (result.status === 'fulfilled') {
        uploaded++
        console.log(`  ✓ [${uploaded}/${total}] ${result.value}`)
      } else {
        console.error(`\n  ✗ Ошибка при загрузке ${result.reason}`)
        process.exit(1)
      }
    }
  }

  return uploaded
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(`\n✗ Папка "${DIST_DIR}" не найдена. Сначала выполни npm run build.\n`)
    process.exit(1)
  }

  const localFiles = getAllFiles(DIST_DIR)
  const localKeys = new Set(localFiles.map(f => f.key))

  console.log('\n🔍 Проверяем устаревшие файлы в R2...')
  const remoteKeys = await listR2Objects()

  if (remoteKeys) {
    const staleKeys = remoteKeys.filter(k => !localKeys.has(k))
    if (staleKeys.length > 0) {
      console.log(`\n🗑  Удаляем ${staleKeys.length} устаревших файлов...`)
      await deleteR2Objects(staleKeys)
    } else {
      console.log('  Устаревших файлов нет.')
    }
  }

  console.log(`\n📤 Загружаем ${localFiles.length} файлов в бакет "${BUCKET}"...\n`)
  const uploaded = await uploadBatch(localFiles)

  console.log(`\n✓ Деплой завершён! Загружено ${uploaded} файлов.`)
  console.log('Проверяй: https://viviyan.co\n')
}

main()
