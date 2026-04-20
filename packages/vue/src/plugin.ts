import type { App }          from 'vue'
import { watch }              from 'vue'
import { LoklifyClient }      from '@loklify/core'
import type { LoklifyOptions } from '@loklify/core'

export const LOKLIFY_KEY = Symbol('loklify')

export interface LoklifyVueOptions extends LoklifyOptions {
  /**
   * Instance vue-i18n existante.
   * Si fournie, les messages sont injectés via setLocaleMessage().
   */
  i18n?: {
    locale:           { value: string }
    setLocaleMessage: (lang: string, messages: Record<string, string>) => void
  }
}

export function createLoklify(options: LoklifyVueOptions) {
  const client = new LoklifyClient(options)
  const loaded = new Set<string>()

  async function loadLocale(lang: string) {
    if (loaded.has(lang)) return
    try {
      const messages = await client.loadLocale(lang)
      options.i18n?.setLocaleMessage(lang, messages)
      loaded.add(lang)
    } catch (err) {
      console.warn('[loklify]', err)
    }
  }

  return {
    install(app: App) {
      app.provide(LOKLIFY_KEY, { client, loadLocale })

      if (options.i18n) {
        const i18n = options.i18n

        // Charger la locale courante au démarrage
        loadLocale(i18n.locale.value)

        // Charger automatiquement à chaque changement de locale
        watch(
          () => i18n.locale.value,
          lang => loadLocale(lang),
        )
      }
    },
  }
}
