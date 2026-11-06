import titles from './source-titles.json'

const TITLES = titles as Record<string, string>

const DOCSETS: Array<[RegExp, string]> = [
  [/^\/training\//, 'Training'],
  [/^\/agent-framework\//, 'Agent Framework'],
  [/^\/azure\/foundry\//, 'Foundry'],
  [/^\/azure\/search\//, 'AI Search'],
  [/^\/azure\/ai-services\/content-understanding\//, 'Content Understanding'],
  [/^\/azure\/ai-services\/document-intelligence\//, 'Document Intelligence'],
  [/^\/azure\/ai-services\/speech-service\//, 'Speech'],
  [/^\/azure\/ai-services\/language-service\//, 'Language'],
  [/^\/azure\/ai-services\/translator\//, 'Translator'],
  [/^\/azure\/ai-services\/content-safety\//, 'Content Safety'],
  [/^\/python\/api\//, 'Python SDK'],
  [/^\/rest\/api\//, 'REST API'],
  [/^\/web-iq\//, 'Web IQ'],
  [/^\/microsoft-365\//, 'Microsoft 365'],
]

/** Link text for a cited Learn URL: "<doc set>: <page title>", falling back to the URL slug. */
export function sourceLabel(url: string): string {
  const key = url.split('#')[0]
  let path = ''
  let slug = url
  try {
    const u = new URL(key)
    path = u.pathname.replace(/^\/[a-z]{2}-[a-z]{2}(?=\/)/, '')
    const parts = path.split('/').filter(Boolean)
    slug = (parts[parts.length - 1] ?? u.hostname).replace(/-/g, ' ')
  } catch {
    return url
  }
  const title = TITLES[key] ?? slug
  const docset = DOCSETS.find(([re]) => re.test(path))?.[1] ?? 'Learn'
  return title.toLowerCase().includes(docset.toLowerCase()) ? title : `${docset}: ${title}`
}

export function hasSourceTitle(url: string): boolean {
  return url.split('#')[0] in TITLES
}
