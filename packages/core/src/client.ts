import type { LoklifyOptions, Messages } from './types'

const DEFAULT_API_BASE = 'https://api.loklify.com'

export class LoklifyClient {
  private project:  string
  private apiBase:  string
  private token:    string | undefined
  private cache     = new Map<string, Messages>()

  constructor(options: LoklifyOptions) {
    this.project = options.project
    this.apiBase = (options.apiBase ?? DEFAULT_API_BASE).replace(/\/$/, '')
    this.token   = options.token
  }

  setToken(token: string) {
    this.token = token
  }

  async loadLocale(lang: string): Promise<Messages> {
    if (this.cache.has(lang)) {
      return this.cache.get(lang)!
    }

    const url     = `${this.apiBase}/api/projects/${this.project}/translations/${lang}`
    const headers: Record<string, string> = { Accept: 'application/json' }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const res = await fetch(url, { headers })

    if (!res.ok) {
      throw new Error(`[loklify] Failed to load locale "${lang}": ${res.status}`)
    }

    const messages: Messages = await res.json()
    this.cache.set(lang, messages)
    return messages
  }

  clearCache(lang?: string) {
    if (lang) this.cache.delete(lang)
    else      this.cache.clear()
  }
}
