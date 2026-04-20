import { defineConfig } from 'tsup'

export default defineConfig({
  entry:      ['src/index.ts'],
  format:     ['esm', 'cjs'],
  dts:        true,
  clean:      true,
  external:   ['vue', 'vue-i18n'],
  noExternal: ['@loklify/core'],
})
