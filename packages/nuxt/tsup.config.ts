import { defineConfig } from 'tsup'

export default defineConfig([
  // Module principal (Nuxt Kit — external)
  {
    entry:    ['src/module.ts'],
    format:   ['esm'],
    dts:      true,
    clean:    true,
    external: ['vue', 'vue-i18n', '@nuxt/kit', 'nuxt/app', '#app'],
  },
  // Runtime plugin — @loklify/vue et @loklify/core bundlés dedans
  {
    entry:      { 'runtime/plugin.client': 'src/runtime/plugin.ts' },
    format:     ['esm'],
    dts:        false,
    external:   ['vue', 'vue-i18n', 'nuxt/app', '#app'],
    noExternal: ['@loklify/vue', '@loklify/core'],
    outExtension: () => ({ js: '.mjs' }),
  },
])
