# @loklify/nuxt

[![npm](https://img.shields.io/npm/v/@loklify/nuxt.svg)](https://www.npmjs.com/package/@loklify/nuxt)

Nuxt 3/4 module for [Loklify](https://loklify.com), the translation management platform for small teams. Adds a single line to your `nuxt.config.ts` and your app loads translations from Loklify on the fly, with full `@nuxtjs/i18n` integration.

> Get a free Loklify account at [app.loklify.com](https://app.loklify.com).

## Install

```bash
npm install @loklify/nuxt @nuxtjs/i18n
```

## Setup

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@loklify/nuxt',
  ],

  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },

  loklify: {
    project: 'your-project-id',
  },
})
```

That's all. On client-side startup, the module fetches the active locale's translations from Loklify and merges them into `vue-i18n` via `setLocaleMessage`. Switching locale auto-fetches the new language.

You'll find your **project ID** in your Loklify dashboard at [app.loklify.com](https://app.loklify.com), under your project's settings.

## Module options

```ts
loklify: {
  project: 'your-project-id',  // required · your Loklify project ID
  token:   '...',              // optional · Bearer token for private projects
}
```

| Option | Type | Required | Description |
|---|---|---|---|
| `project` | `string` | yes | Your Loklify project ID |
| `token` | `string` | no | Bearer token for private projects |

## Without `@nuxtjs/i18n`

The module works without `@nuxtjs/i18n`. It still installs a Vue plugin exposing `useLoklify()`:

```vue
<script setup>
const { client, loadLocale } = useLoklify()
const messages = await client.loadLocale('fr')
</script>
```

## How it works

1. The module adds a client-side plugin that depends on `i18n:plugin`.
2. On startup, it reads `nuxtApp.$i18n` and connects it to `@loklify/vue`.
3. The current locale is fetched from `https://api.loklify.com` and injected via `setLocaleMessage`.
4. A reactive watch handles locale changes automatically.

## Runtime config

The module exposes its options through `runtimeConfig.public.loklify`. You can override at runtime via env vars:

```bash
NUXT_PUBLIC_LOKLIFY_PROJECT=xxx
NUXT_PUBLIC_LOKLIFY_TOKEN=xxx
```

## Related packages

- **Core (any framework)**: [`@loklify/core`](https://www.npmjs.com/package/@loklify/core)
- **Vue 3**: [`@loklify/vue`](https://www.npmjs.com/package/@loklify/vue) · the underlying plugin

## Links

- Platform: [loklify.com](https://loklify.com)
- Dashboard: [app.loklify.com](https://app.loklify.com)
- Pricing: [loklify.com/#pricing](https://loklify.com/#pricing)

## License

MIT
