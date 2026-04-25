import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    loklify?: Partial<ModuleOptions>
  }
  interface NuxtOptions {
    loklify?: Partial<ModuleOptions>
  }
  interface PublicRuntimeConfig {
    loklify: {
      project: string
      apiBase: string
      token:   string
    }
  }
}

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

    const { resolve } = createResolver(import.meta.url)
    addPlugin({ src: resolve('./runtime/plugin.client'), mode: 'client' })
  },
})
