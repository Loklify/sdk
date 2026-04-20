import { inject }        from 'vue'
import { LOKLIFY_KEY }   from './plugin'
import type { LoklifyClient } from '@loklify/core'

interface LoklifyContext {
  client:     LoklifyClient
  loadLocale: (lang: string) => Promise<void>
}

export function useLoklify(): LoklifyContext {
  const ctx = inject<LoklifyContext>(LOKLIFY_KEY)
  if (!ctx) {
    throw new Error('[loklify] useLoklify() must be used inside a component tree where createLoklify() plugin is installed.')
  }
  return ctx
}
