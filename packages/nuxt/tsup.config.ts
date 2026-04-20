import { defineConfig } from 'tsup'

export default defineConfig({
  entry:    ['src/module.ts'],
  format:   ['esm', 'cjs'],
  dts:      true,
  clean:    true,
  external: ['vue', 'vue-i18n', '@loklify/core', '@loklify/vue', '@nuxt/kit'],
})
