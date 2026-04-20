import { defineConfig } from 'tsup'

export default defineConfig([
  // Module Nuxt (CJS + ESM)
  {
    entry:    ['src/module.ts'],
    format:   ['esm', 'cjs'],
    dts:      true,
    clean:    true,
    external: ['vue', 'vue-i18n', '@loklify/core', '@loklify/vue', '@nuxt/kit', '#imports'],
  },
  // Runtime plugin (ESM uniquement — chargé par Nuxt au runtime)
  {
    entry:    { 'runtime/plugin': 'src/runtime/plugin.ts' },
    format:   ['esm'],
    dts:      false,
    external: ['vue', 'vue-i18n', '@loklify/core', '@loklify/vue', 'nuxt/app'],
  },
])
