import type { ModuleOptions } from './module'

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

export {}
