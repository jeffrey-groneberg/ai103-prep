/**
 * Verifies that every learn.microsoft.com URL cited by lessons, questions and the course map
 * still resolves (HTTP 200 after redirects).
 *
 *   npm run check:links
 */
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import type { Lesson, QuestionFile } from '../src/lib/types.ts'
import { modules } from '../src/content/course.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const content = join(root, 'src', 'content')
const urls = new Map<string, Set<string>>()
const add = (url: string, where: string) => {
  const key = url.split('#')[0]
  if (!urls.has(key)) urls.set(key, new Set())
  urls.get(key)!.add(where)
}

for (const m of modules) add(m.url, `course:${m.id}`)
for (const f of readdirSync(join(content, 'questions')).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(join(content, 'questions', f), 'utf8')) as QuestionFile
  for (const q of data.questions) for (const s of q.sources) add(s, q.id)
}
for (const f of readdirSync(join(content, 'lessons')).filter((f) => f.endsWith('.ts') && !f.startsWith('_'))) {
  const mod = (await import(pathToFileURL(join(content, 'lessons', f)).href)) as { lesson: Lesson }
  for (const s of mod.lesson.sources) add(s.url, `lesson:${mod.lesson.module}`)
}

// Learn rate-limits bursts (HTTP 429): honor Retry-After and back off; network errors get retried too.
async function check(url: string): Promise<number> {
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'ai103-prep-link-check' }, signal: AbortSignal.timeout(30000) })
      await res.body?.cancel()
      if (res.status === 429) {
        const retryAfter = Number(res.headers.get('retry-after'))
        await new Promise((r) => setTimeout(r, (Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : 5 * (attempt + 1)) * 1000))
        continue
      }
      return res.status
    } catch {
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)))
    }
  }
  return 0
}

const entries = [...urls.entries()]
const failures: Array<{ url: string; status: number; where: string[] }> = []
let index = 0
async function worker() {
  while (index < entries.length) {
    const [url, where] = entries[index++]
    const status = await check(url)
    if (status !== 200) failures.push({ url, status, where: [...where] })
  }
}
await Promise.all(Array.from({ length: 3 }, worker))

if (failures.length) {
  console.error(`✗ ${failures.length} of ${entries.length} URLs failed:`)
  for (const f of failures) console.error(`- [${f.status || 'network'}] ${f.url}  ← ${f.where.slice(0, 4).join(', ')}${f.where.length > 4 ? ' …' : ''}`)
  process.exit(1)
}
console.log(`✓ All ${entries.length} cited URLs resolve.`)
