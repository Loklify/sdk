import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  /** ID du projet Loklify */
  project: string
  /** Base URL de l'API */
  apiBase?: string
  /** Bearer token pour les projets privés */
  token?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name:       '@loklify/nuxt',
    configKey:  'loklify',
    compatibility: { nuxt: '>=3.0.0' },
  },

  defaults: {
    apiBase: 'https://app.loklify.io',
  },

  setup(options, nuxt) {
    // Exposer les options au runtime via runtimeConfig
    nuxt.options.runtimeConfig.public.loklify = {
      project: options.project,
      apiBase: options.apiBase!,
      token:   options.token ?? '',
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
