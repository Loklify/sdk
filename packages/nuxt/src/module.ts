import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit'

export interface ModuleOptions {
  /** ID du projet Loklify */
  project: string
  /** Bearer token pour les projets privés */
  token?: string
  /** @internal Override de l'URL API — usage interne uniquement */
  apiBase?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name:      '@loklify/nuxt',
    configKey: 'loklify',
  },

  defaults: {
    apiBase: 'https://api.loklify.com',
  },

  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.loklify = {
      project: options.project,
      apiBase: options.apiBase!,
      token:   options.token ?? '',
    }

    // Génère le plugin directement dans .nuxt/ pour éviter
    // les problèmes de résolution de chemin avec Nuxt 4
    addPluginTemplate({
      filename: 'loklify.client.mjs',
      getContents: () => `
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { createLoklify } from '@loklify/vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const opts = config.public.loklify
  const i18n = nuxtApp.$i18n ?? undefined

  const plugin = createLoklify({
    project: opts.project,
    apiBase:  opts.apiBase,
    token:    opts.token || undefined,
    i18n: i18n ? {
      locale:           i18n.locale,
      setLocaleMessage: i18n.setLocaleMessage.bind(i18n),
    } : undefined,
  })

  nuxtApp.vueApp.use(plugin)
})
`.trimStart(),
    })
  },
})
