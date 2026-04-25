import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { createLoklify } from '@loklify/vue'

export default defineNuxtPlugin({
  name: 'loklify',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    const config = useRuntimeConfig()
    const opts   = config.public.loklify as { project: string; apiBase: string; token: string }

    const i18n = (nuxtApp.$i18n as any) ?? undefined

    const plugin = createLoklify({
      project: opts.project,
      apiBase: opts.apiBase,
      token:   opts.token || undefined,
      i18n:    i18n
        ? {
            locale:           i18n.locale,
            setLocaleMessage: i18n.setLocaleMessage.bind(i18n),
          }
        : undefined,
    })

    nuxtApp.vueApp.use(plugin)
  },
})
